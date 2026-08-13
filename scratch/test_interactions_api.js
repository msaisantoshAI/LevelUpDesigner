const https = require('https');

// Helper to test Interactions API vs GenerateContent API
function sendReq(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function testModels(apiKey) {
  console.log('Testing with key:', apiKey ? (apiKey.slice(0, 6) + '...') : 'none');
  const models = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  
  for (const model of models) {
    console.log(`\n--- Testing ${model} via Interactions API ---`);
    const postDataInteractions = JSON.stringify({
      model: model,
      input: 'Generate a short JSON: {"t": "UX Title", "insight": "Great insight"}'
    });
    
    const resInteractions = await sendReq({
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: '/v1beta/interactions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
        'Content-Length': Buffer.byteLength(postDataInteractions)
      }
    }, postDataInteractions).catch(e => ({ status: 500, error: e.message }));
    
    console.log('Interactions API status:', resInteractions.status, JSON.stringify(resInteractions.data || resInteractions.error || '').slice(0, 200));

    console.log(`--- Testing ${model} via generateContent API ---`);
    const postDataGen = JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: 'Generate a short JSON: {"t": "UX Title", "insight": "Great insight"}' }] }]
    });
    
    const resGen = await sendReq({
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postDataGen)
      }
    }, postDataGen).catch(e => ({ status: 500, error: e.message }));
    
    console.log('generateContent API status:', resGen.status, JSON.stringify(resGen.data || resGen.error || '').slice(0, 200));
  }
}

testModels(process.argv[2] || '');
