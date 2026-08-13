const { callGeminiAPI, callOpenAICompatibleAPI, callAnthropicAPI } = require('../_lib/ai-engine');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-AI-Key, X-AI-Provider, X-AI-BaseUrl, X-AI-Model, X-Gemini-Key');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body || {};
    const provider = payload.provider || req.headers['x-ai-provider'] || 'gemini';
    const apiKey = payload.apiKey || req.headers['x-ai-key'] || req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    const baseUrl = payload.baseUrl || req.headers['x-ai-baseurl'];
    const model = payload.model || req.headers['x-ai-model'];

    if (!apiKey) {
      return res.status(400).json({ success: false, error: 'No API key provided. Please paste your API key.' });
    }

    const testPrompt = `Respond strictly in JSON: {"ok": true, "status": "connected"}`;

    const p = (provider || 'gemini').toLowerCase();
    if (p === 'openai' || p === 'groq' || p === 'custom' || p === 'openrouter') {
      const url = p === 'groq' ? 'https://api.groq.com/openai/v1/chat/completions'
                : p === 'openai' ? 'https://api.openai.com/v1/chat/completions'
                : (baseUrl || 'https://openrouter.ai/api/v1/chat/completions');
      await callOpenAICompatibleAPI(url, apiKey, model || (p === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'), "You are a connection test helper.", testPrompt);
    } else if (p === 'anthropic') {
      await callAnthropicAPI(apiKey, model || 'claude-3-5-haiku-20241022', "You are a test helper.", testPrompt);
    } else {
      await callGeminiAPI(apiKey, testPrompt, model);
    }

    return res.status(200).json({ success: true, message: `${provider.toUpperCase()} API key verified and connected successfully!` });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
