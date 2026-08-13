const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { URL } = require('url');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

// Helper to load .env variables without external dependencies
function loadEnv() {
  const envPaths = [
    path.join(__dirname, '.env'),
    path.join(os.homedir(), '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx > 0) {
              const key = trimmed.slice(0, eqIdx).trim();
              const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          }
        });
      } catch (e) {
        console.error('Error reading env file:', e.message);
      }
    }
  }
}

loadEnv();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Generic HTTPS / HTTP request helper
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
      reject(new Error('API request timed out (15 seconds)'));
    });

    if (postData) req.write(postData);
    req.end();
  });
}

// Helper to safely extract and parse JSON object from any LLM response text
function extractJsonObject(text) {
  if (typeof text === 'object' && text !== null) return text;
  if (typeof text !== 'string') throw new Error('Expected string output from AI');

  const stripped = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  try {
    return JSON.parse(stripped);
  } catch (e) {
    const match = stripped.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('AI response did not contain valid JSON: ' + text.slice(0, 150));
  }
}

// 1. Google Gemini API Caller (supports both latest Interactions API and generateContent)
async function callGeminiAPI(apiKey, prompt, customModel) {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) throw new Error('No API key provided. Please paste your Google Gemini API key.');

  // Priority list including new frontier models and fallback standard models
  const candidateModels = [
    customModel,
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.1-pro',
    'gemini-3-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro'
  ].filter(Boolean).filter((m, i, arr) => arr.indexOf(m) === i);

  let lastError = null;

  for (const model of candidateModels) {
    // Strategy 1: Try new Gemini Interactions API
    try {
      const interactionPayload = JSON.stringify({
        model: model,
        input: prompt
      });

      const interactionOptions = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: '/v1beta/interactions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': cleanKey,
          'Content-Length': Buffer.byteLength(interactionPayload)
        },
        timeout: 25000
      };

      const parsedInteraction = await sendJsonRequest(interactionOptions, interactionPayload);
      const outputText = parsedInteraction.output_text || 
                         parsedInteraction.outputs?.[0]?.text || 
                         parsedInteraction.output || 
                         (typeof parsedInteraction.candidates?.[0]?.content?.parts?.[0]?.text === 'string' ? parsedInteraction.candidates[0].content.parts[0].text : null);

      if (outputText) {
        return extractJsonObject(outputText);
      }
    } catch (err1) {
      const msg1 = (err1.message || '').toLowerCase();
      if (msg1.includes('api key not valid') || msg1.includes('api_key_invalid') || msg1.includes('permission_denied')) {
        throw err1;
      }
    }

    // Strategy 2: Try generateContent API
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
          maxOutputTokens: 800
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
        timeout: 25000
      };

      const parsed = await sendJsonRequest(options, postData);
      const rawText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return extractJsonObject(rawText);
      }
    } catch (err2) {
      lastError = err2;
      const msg2 = (err2.message || '').toLowerCase();
      if (msg2.includes('api key not valid') || msg2.includes('api_key_invalid') || msg2.includes('permission_denied')) {
        throw err2;
      }
      continue;
    }
  }

  throw lastError || new Error('Failed to generate with available Gemini models.');
}

// 2. OpenAI / Groq / OpenRouter / Custom Provider Caller
async function callOpenAICompatibleAPI(endpointUrl, apiKey, model, systemPrompt, userPrompt) {
  const parsedUrl = new URL(endpointUrl);
  const postData = JSON.stringify({
    model: model || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 800
  });

  const options = {
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 12000
  };

  const response = await sendJsonRequest(options, postData);
  const textContent = response.choices?.[0]?.message?.content;
  if (!textContent) throw new Error('No content returned from AI provider');
  return extractJsonObject(textContent);
}

// 3. Anthropic Claude Caller
async function callAnthropicAPI(apiKey, model, systemPrompt, userPrompt) {
  const postData = JSON.stringify({
    model: model || 'claude-3-5-haiku-20241022',
    max_tokens: 800,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt + '\nRespond strictly with a single JSON object conforming to the requested schema.' }
    ]
  });

  const options = {
    hostname: 'api.anthropic.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 12000
  };

  const response = await sendJsonRequest(options, postData);
  const textContent = response.content?.[0]?.text;
  if (!textContent) throw new Error('No content returned from Claude');
  return extractJsonObject(textContent);
}

// Main Dispatcher for Topic Generation
async function generateAITopic(provider, apiKey, customBaseUrl, customModel, level, fieldOfStudy, readTitles) {
  const fieldName = fieldOfStudy || 'Product Design';
  
  const systemPrompt = `You are an elite Design Mentor & Master Curriculum Architect for "LevelUP Designers".
The user has chosen the Field of Study: "${fieldName}".
Current Mastery Tier: ${level.toUpperCase()}
- Beginner: Sequential foundations from scratch (Mental models -> Problem discovery -> User interviews -> IA & User Flows -> Wireframing -> Visual 8pt hierarchy -> Interaction affordances -> Usability heuristics -> Moderated testing -> Developer handoff).
- Intermediate: Systems architecture, advanced workflows, metric optimization, edge cases, technical fluency (APIs, tokens), micro-interactions.
- Advanced: High-stakes architecture, multi-tenant enterprise scale, AI agent governance, executive alignment, growth loops, pricing & business strategy.

ALREADY MASTERED LESSONS IN SEQUENCE (${readTitles.length} total):
${readTitles.slice(0, 40).map((t, idx) => `Step ${idx+1}: ${t}`).join('\n') || '- None yet (starting from Step 1)'}

CRITICAL PEDAGOGICAL SEQUENCING RULES:
1. Think as a master educator designing a step-by-step sequential learning path (like learning the alphabet A -> B -> C in order). Never suggest topics randomly.
2. Generate the single most relevant, logical NEXT sequential lesson (Step ${readTitles.length + 1}) building systematically on their previous lessons.
3. DO NOT repeat any topic already in their journal.
4. "step": ${readTitles.length + 1},
5. "t": Crisp, industry-standard title (e.g. "Jobs-To-Be-Done (JTBD) Framework", "Visual Hierarchy & 8pt Spatial Grid").
6. "domain": 2-4 word domain category accurately reflecting "${fieldName}".
7. "insight": 1-2 sentence core concept explanation tailored to "${level}".
8. "prompt": 1-sentence actionable exercise or diagnostic question.
9. "resources": Provide extensive arrays of 4-6 high-value resources for each: "articles", "videos", "websites". Keep titles clear and informative.

FORMAT (JSON only):
{
  "id": "slug-id",
  "t": "Short Punchy Title",
  "domain": "${fieldName}",
  "insight": "Core principle in 1-2 clear sentences.",
  "prompt": "Exercise: 1 practical prompt for the user.",
  "resources": {
    "articles": [
      {"title": "Deep Dive Guide on Topic (NN/g)", "url": "https://..."},
      {"title": "Industry Best Practices (UX Collective)", "url": "https://..."},
      {"title": "Foundational Principles (IxDF)", "url": "https://..."}
    ],
    "videos": [
      {"title": "Full Visual Masterclass & Breakdown", "url": "https://..."},
      {"title": "Real-World UX Case Study Teardown", "url": "https://..."}
    ],
    "websites": [
      {"title": "Mobbin Real UI Patterns & User Flows", "url": "https://..."},
      {"title": "Laws of UX Heuristic Matrix", "url": "https://..."},
      {"title": "Design Systems Repository & Token Guide", "url": "https://..."}
    ]
  }
}`;

  const userPrompt = `Generate the next daily learning topic for Field of Study: "${fieldName}" at Level: "${level}". Respond ONLY in valid JSON with comprehensive resources.`;

  let topicObj;

  switch (provider) {
    case 'openai':
      topicObj = await callOpenAICompatibleAPI('https://api.openai.com/v1/chat/completions', apiKey, customModel || 'gpt-4o-mini', systemPrompt, userPrompt);
      break;
    case 'anthropic':
      topicObj = await callAnthropicAPI(apiKey, customModel || 'claude-3-5-haiku-20241022', systemPrompt, userPrompt);
      break;
    case 'groq':
      topicObj = await callOpenAICompatibleAPI('https://api.groq.com/openai/v1/chat/completions', apiKey, customModel || 'llama-3.3-70b-versatile', systemPrompt, userPrompt);
      break;
    case 'custom':
    case 'openrouter': {
      const url = customBaseUrl || 'https://openrouter.ai/api/v1/chat/completions';
      topicObj = await callOpenAICompatibleAPI(url, apiKey, customModel || 'auto', systemPrompt, userPrompt);
      break;
    }
    case 'gemini':
    default:
      topicObj = await callGeminiAPI(apiKey, systemPrompt + '\n\n' + userPrompt, customModel);
      break;
  }

  if (!topicObj.id) {
    topicObj.id = 'ai-' + Date.now();
  }
  if (!topicObj.domain) {
    topicObj.domain = fieldName;
  }

  const topicQuery = encodeURIComponent(`${topicObj.t} ${fieldName}`);
  const domainQuery = encodeURIComponent(`${fieldName}`);

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

  if (!topicObj.resources || typeof topicObj.resources !== 'object') {
    topicObj.resources = defaultResources;
  } else {
    // Ensure all 3 categories have full rich library
    topicObj.resources.articles = (topicObj.resources.articles && topicObj.resources.articles.length >= 4) ? topicObj.resources.articles : defaultResources.articles;
    topicObj.resources.videos = (topicObj.resources.videos && topicObj.resources.videos.length >= 3) ? topicObj.resources.videos : defaultResources.videos;
    topicObj.resources.websites = (topicObj.resources.websites && topicObj.resources.websites.length >= 4) ? topicObj.resources.websites : defaultResources.websites;
  }
  return topicObj;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-AI-Key, X-AI-Provider, X-AI-BaseUrl, X-AI-Model, X-Gemini-Key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Status Check
  if (pathname === '/api/ai/status' || pathname === '/api/gemini/status') {
    const hasKey = !!(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || req.headers['x-ai-key'] || req.headers['x-gemini-key']);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      configured: hasKey,
      serverEnvConfigured: !!(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY)
    }));
    return;
  }

  // API: Test API Key
  if ((pathname === '/api/ai/test-key' || pathname === '/api/gemini/test-key') && req.method === 'POST') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(rawBody || '{}');
        const provider = payload.provider || req.headers['x-ai-provider'] || 'gemini';
        const apiKey = payload.apiKey || req.headers['x-ai-key'] || req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
        const baseUrl = payload.baseUrl || req.headers['x-ai-baseurl'];
        const model = payload.model || req.headers['x-ai-model'];

        if (!apiKey) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'No API key provided. Please paste your API key.' }));
          return;
        }

        const testPrompt = `Respond strictly in JSON: {"ok": true, "status": "connected"}`;
        
        if (provider === 'openai' || provider === 'groq' || provider === 'custom' || provider === 'openrouter') {
          const url = provider === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions'
                    : provider === 'openai' ? 'https://api.openai.com/v1/chat/completions'
                    : (baseUrl || 'https://openrouter.ai/api/v1/chat/completions');
          await callOpenAICompatibleAPI(url, apiKey, model || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'), "You are a connection test helper.", testPrompt);
        } else if (provider === 'anthropic') {
          await callAnthropicAPI(apiKey, model || 'claude-3-5-haiku-20241022', "You are a test helper.", testPrompt);
        } else {
          await callGeminiAPI(apiKey, testPrompt, model);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: `${provider.toUpperCase()} API key verified and connected successfully!` }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API: Generate Topic
  if ((pathname === '/api/ai/generate-topic' || pathname === '/api/gemini/generate-topic') && req.method === 'POST') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(rawBody || '{}');
        const provider = payload.provider || req.headers['x-ai-provider'] || 'gemini';
        const apiKey = payload.apiKey || req.headers['x-ai-key'] || req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
        const baseUrl = payload.baseUrl || req.headers['x-ai-baseurl'];
        const customModel = payload.model || req.headers['x-ai-model'];
        const level = payload.level || 'beginner';
        const fieldOfStudy = payload.fieldOfStudy || 'Product Design';
        const readHistory = Array.isArray(payload.readHistory) ? payload.readHistory : [];
        const readTitles = readHistory.map(h => h.title || h.t).filter(Boolean);

        if (!apiKey) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'MISSING_API_KEY',
            message: 'No API key provided. Please configure your API key in AI Setup.'
          }));
          return;
        }

        const generatedTopic = await generateAITopic(provider, apiKey, baseUrl, customModel, level, fieldOfStudy, readTitles);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'success',
          source: provider,
          topic: generatedTopic
        }));
      } catch (err) {
        console.error('AI Generation Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'error',
          message: err.message
        }));
      }
    });
    return;
  }

  // Static File Serving
  let reqPath = parsedUrl.pathname;
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`LevelUP Designers server running at http://localhost:${PORT}/`);
});
