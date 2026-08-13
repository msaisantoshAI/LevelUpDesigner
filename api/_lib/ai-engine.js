const https = require('https');
const http = require('http');

function sendJsonRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const isHttps = options.protocol !== 'http:';
    const client = isHttps ? https : http;

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        } else {
          try {
            const errObj = JSON.parse(body);
            const msg = errObj.error?.message || errObj.message || (typeof errObj.error === 'string' ? errObj.error : JSON.stringify(errObj));
            reject(new Error(msg || `API returned HTTP ${res.statusCode}`));
          } catch (e) {
            reject(new Error(`API returned HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
          }
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('API request timed out'));
    });

    if (postData) req.write(postData);
    req.end();
  });
}

function extractJsonObject(text) {
  if (typeof text === 'object' && text !== null) return text;
  if (typeof text !== 'string') throw new Error('Expected string output from AI');

  const stripped = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  try {
    return JSON.parse(stripped);
  } catch (e) {
    const firstBrace = stripped.indexOf('{');
    const lastBrace = stripped.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      const sub = stripped.slice(firstBrace, lastBrace + 1);
      return JSON.parse(sub);
    }
    throw new Error('AI returned non-JSON text format: ' + stripped.slice(0, 100));
  }
}

async function callGeminiAPI(apiKey, prompt, customModel) {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) throw new Error('No API key provided. Please paste your Google Gemini API key.');

  const fastModels = [
    customModel,
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest'
  ].filter(Boolean).filter((m, i, arr) => arr.indexOf(m) === i);

  let lastError = null;

  for (const model of fastModels) {
    try {
      const postData = JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 700
        }
      });

      const options = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: `/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 6000
      };

      const parsed = await sendJsonRequest(options, postData);
      const rawText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return extractJsonObject(rawText);
      }
    } catch (err) {
      lastError = err;
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('api key not valid') || msg.includes('api_key_invalid') || msg.includes('permission_denied')) {
        throw err;
      }
      continue;
    }
  }

  throw lastError || new Error('Gemini API call timed out or failed.');
}

async function callOpenAICompatibleAPI(endpointUrl, apiKey, model, systemPrompt, userPrompt) {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) throw new Error('No API key provided.');

  const parsedUrl = new URL(endpointUrl);
  const postData = JSON.stringify({
    model: model || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 700
  });

  const options = {
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cleanKey}`,
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 10000
  };

  const parsed = await sendJsonRequest(options, postData);
  const content = parsed.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty message content returned from OpenAI provider');
  return extractJsonObject(content);
}

async function callAnthropicAPI(apiKey, model, systemPrompt, userPrompt) {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) throw new Error('No Anthropic API key provided.');

  const postData = JSON.stringify({
    model: model || 'claude-3-5-haiku-20241022',
    max_tokens: 700,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': cleanKey,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 10000
  };

  const parsed = await sendJsonRequest(options, postData);
  const content = parsed.content?.[0]?.text;
  if (!content) throw new Error('Empty content returned from Anthropic');
  return extractJsonObject(content);
}

function ensureTopicResources(topicObj, fieldName) {
  const topicQuery = encodeURIComponent(topicObj.t || 'Design Systems');
  const domainQuery = encodeURIComponent(fieldName || 'Product Design');

  const defaultResources = {
    articles: [
      { title: `Deep Dive: ${topicObj.t} (Nielsen Norman Group)`, url: `https://www.nngroup.com/search/?q=${topicQuery}` },
      { title: `Mastering ${fieldName} Frameworks on UX Collective`, url: `https://uxdesign.cc/search?q=${domainQuery}` },
      { title: `Foundations & Best Practices (Interaction Design Foundation)`, url: `https://www.interaction-design.org/search?q=${topicQuery}` },
      { title: `Smashing Magazine: Practical Workflow Guide for ${topicObj.t}`, url: `https://www.smashingmagazine.com/search/?q=${topicQuery}` },
      { title: `Harvard Business Review / Design Strategy Perspective`, url: `https://hbr.org/search?term=${domainQuery}+design+strategy` },
      { title: `Growth.design Psychology & Product Case Studies`, url: `https://growth.design/case-studies` }
    ],
    videos: [
      { title: `${topicObj.t} — Visual Masterclass & Breakdown (YouTube)`, url: `https://www.youtube.com/results?search_query=${topicQuery}+masterclass` },
      { title: `Real-World Case Study Teardown: ${fieldName} in Top Tier Apps`, url: `https://www.youtube.com/results?search_query=${domainQuery}+ux+case+study+breakdown` },
      { title: `Flux Academy & AJ&Smart Workshop: Advanced Design Techniques`, url: `https://www.youtube.com/results?search_query=aj+smart+${domainQuery}+workshop` },
      { title: `Figma Official & Design Leaders: Live Workflow for ${topicObj.t}`, url: `https://www.youtube.com/results?search_query=figma+${topicQuery}+tutorial` },
      { title: `5-Minute UX Heuristics & Common Anti-Patterns`, url: `https://www.youtube.com/results?search_query=${topicQuery}+design+mistakes` }
    ],
    websites: [
      { title: `Live UI Patterns & Real Apps for ${topicObj.t} (Mobbin)`, url: `https://mobbin.com/search?q=${topicQuery}` },
      { title: `Laws of UX: Interactive Psychological Principles & Heuristics`, url: `https://lawsofux.com/` },
      { title: `Component Gallery: UI Component Reference Repository`, url: `https://component.gallery/` },
      { title: `Pageflows: Verified User Flow Recordings from Real Products`, url: `https://pageflows.com/` },
      { title: `Checklist.design: Industry Standards & QA Checklists`, url: `https://www.checklist.design/` },
      { title: `Built For Mars: Comprehensive UX Audits & Teardowns`, url: `https://builtformars.com/` }
    ]
  };

  topicObj.resources = defaultResources;
  return topicObj;
}

async function generateAITopic(provider, apiKey, baseUrl, customModel, level, fieldOfStudy, readHistory = []) {
  const readTitles = (readHistory || []).map(h => (typeof h === 'string' ? h : h.title || h.t)).filter(Boolean);
  const historyText = readTitles.length > 0 ? `The learner has already completed:\n- ${readTitles.slice(-10).join('\n- ')}\nDo NOT repeat any of these concepts.` : 'The learner is just beginning their progressive learning sequence.';

  const systemPrompt = `You are the lead curriculum architect for LevelUP Designers, an interactive learning platform for UX/UI and Product Designers. You generate structured, practical, beginner-friendly learning cards strictly in JSON format.`;

  const userPrompt = `
Generate a brand new, highly engaging study topic for a designer at the "${level.toUpperCase()}" tier focusing on "${fieldOfStudy}".
${historyText}

Requirements:
1. Explain the concept in crystal-clear, relatable English for a learner building practical skills.
2. Provide a 1-sentence punchy, memorable insight.
3. Provide an actionable prompt or mini-exercise they can do today in Figma or their product workflow.
4. Output strictly valid JSON with no markdown backticks, matching this exact schema:
{
  "t": "Concise Topic Title",
  "domain": "${fieldOfStudy}",
  "level": "${level}",
  "field": "${fieldOfStudy}",
  "insight": "1-2 sentence core concept explanation explaining why it matters in real product work.",
  "prompt": "Actionable, hands-on exercise prompt or framework to apply today."
}
`;

  let topicResult = null;
  const p = (provider || 'gemini').toLowerCase();

  if (p === 'openai' || p === 'groq' || p === 'custom' || p === 'openrouter') {
    const url = p === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions'
              : p === 'openai' ? 'https://api.openai.com/v1/chat/completions'
              : (baseUrl || 'https://openrouter.ai/api/v1/chat/completions');
    topicResult = await callOpenAICompatibleAPI(url, apiKey, customModel || (p === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'), systemPrompt, userPrompt);
  } else if (p === 'anthropic') {
    topicResult = await callAnthropicAPI(apiKey, customModel || 'claude-3-5-haiku-20241022', systemPrompt, userPrompt);
  } else {
    topicResult = await callGeminiAPI(apiKey, userPrompt, customModel);
  }

  topicResult.id = 'ai-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  topicResult.level = level;
  topicResult.field = fieldOfStudy;
  topicResult.domain = topicResult.domain || fieldOfStudy;
  topicResult = ensureTopicResources(topicResult, fieldOfStudy);

  return topicResult;
}

module.exports = {
  callGeminiAPI,
  callOpenAICompatibleAPI,
  callAnthropicAPI,
  generateAITopic,
  ensureTopicResources
};
