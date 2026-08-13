const http = require('http');
const fs = require('fs');

async function runTests() {
  console.log('Testing server response and new features...');
  
  http.get('http://localhost:8080/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status code:', res.statusCode);
      
      const checks = [
        { name: 'Timer Play/Pause button', pass: data.includes('id="timerPlayPauseBtn"') },
        { name: 'Timer Restart button', pass: data.includes('id="timerRestartBtn"') },
        { name: 'Timer Expand / Settings button', pass: data.includes('id="timerExpandBtn"') },
        { name: 'Timer Settings popover panel', pass: data.includes('id="timerSettingsPopover"') },
        { name: 'Stopwatch / Countdown mode toggle', pass: data.includes('id="modeStopwatchBtn"') && data.includes('id="modeCountdownBtn"') },
        { name: 'Quick presets grid', pass: data.includes('timer-presets-grid') },
        { name: 'Manual duration inputs', pass: data.includes('id="timerInputHrs"') && data.includes('id="timerInputMins"') },
        { name: 'Step-by-step curriculum numbering', pass: data.includes('Step ${stepNumber} of ${totalSteps}') },
        { name: 'Sequential fallback logic', pass: data.includes('unread[0]') },
        { name: 'Picture-in-Picture internal controls', pass: data.includes('id="pipPlayPauseBtn"') && data.includes('id="pipResetBtn"') },
        { name: 'Audio chime on finish', pass: data.includes('playTimerChime') }
      ];
      
      let allPass = true;
      checks.forEach(c => {
        console.log(`${c.pass ? '✅' : '❌'} ${c.name}`);
        if (!c.pass) allPass = false;
      });
      
      if (allPass) {
        console.log('\n🎉 ALL VERIFICATION CHECKS PASSED PERFECTLY!');
      } else {
        console.error('\n⚠️ Some verification checks failed.');
      }
    });
  }).on('error', (err) => {
    console.error('HTTP Request error:', err.message);
  });
}

runTests();
