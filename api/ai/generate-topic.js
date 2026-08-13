const { generateAITopic } = require('../_lib/ai-engine');

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
    const apiKey = payload.apiKey || req.headers['x-ai-key'] || req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    const baseUrl = payload.baseUrl || req.headers['x-ai-baseurl'];
    const customModel = payload.model || req.headers['x-ai-model'];
    const level = payload.level || 'beginner';
    const fieldOfStudy = payload.fieldOfStudy || 'Product Design';
    const readHistory = Array.isArray(payload.readHistory) ? payload.readHistory : [];

    if (!apiKey) {
      return res.status(400).json({
        error: 'MISSING_API_KEY',
        message: 'No API key provided. Please configure your API key in AI Setup.'
      });
    }

    const topic = await generateAITopic(provider, apiKey, baseUrl, customModel, level, fieldOfStudy, readHistory);
    return res.status(200).json({ status: 'success', topic });
  } catch (err) {
    console.error('Serverless Generate Topic Error:', err);
    return res.status(500).json({
      status: 'error',
      message: err.message || 'AI Generation failed. Please check your API key.'
    });
  }
};
