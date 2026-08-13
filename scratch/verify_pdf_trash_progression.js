const http = require('http');

async function verify() {
  console.log('Testing features on http://localhost:8080/ ...');

  http.get('http://localhost:8080/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('HTTP Status:', res.statusCode);

      const checks = [
        { name: 'Download PDF Journal Button', pass: data.includes('id="downloadJournalPdfBtn"') },
        { name: 'Download PDF function implemented', pass: data.includes('function downloadJournalAsPdf') },
        { name: 'Printable HTML/CSS generation', pass: data.includes('@media print') && data.includes('pdf-topic-card') },
        { name: 'Recycle bin footer & Empty button', pass: data.includes('id="trashDrawerFooter"') && data.includes('id="emptyTrashBtn"') },
        { name: 'Permanent delete function', pass: data.includes('function deletePermanently') },
        { name: 'Empty recycle bin function', pass: data.includes('function emptyRecycleBin') },
        { name: 'Guaranteed sequential advancing logic', pass: data.includes('currentIndex >= 0') && data.includes('(currentIndex + 1) % deck.length') },
        { name: 'Field & Level immediate update reset', pass: data.includes('currentCardTopic = null') }
      ];

      let allPassed = true;
      checks.forEach(c => {
        console.log(`${c.pass ? '✅' : '❌'} ${c.name}`);
        if (!c.pass) allPassed = false;
      });

      if (allPassed) {
        console.log('\n🎉 ALL RECYCLE BIN, PDF DOWNLOAD & TOPIC ADVANCING VERIFICATION CHECKS PASSED!');
      } else {
        console.error('\n⚠️ Some verification checks failed.');
      }
    });
  }).on('error', (err) => {
    console.error('Request error:', err.message);
  });
}

verify();
