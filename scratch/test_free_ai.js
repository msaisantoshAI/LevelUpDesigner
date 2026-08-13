const https = require('https');

function testFreeAi() {
  const prompt = encodeURIComponent('Generate a JSON object for a Product Design learning topic: {"t": "Topic Title", "domain": "Domain", "insight": "Insight", "prompt": "Prompt"}');
  const url = `https://text.pollinations.ai/${prompt}?json=true&model=openai`;

  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Response:', data.slice(0, 300));
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
}

testFreeAi();
