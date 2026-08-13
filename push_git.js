const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');

async function pushRepo(token) {
  const dir = __dirname;
  
  // Set current branch to main
  try {
    await git.branch({ fs, dir, ref: 'main', checkout: true });
    console.log('Branch "main" created and active.');
  } catch (e) {
    console.log('Branch note:', e.message);
  }

  console.log('Attempting push to https://github.com/msaisantoshAI/LevelUp-Designer.git (branch: main)...');

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      remoteRef: 'refs/heads/main',
      force: true,
      onAuth: () => {
        if (token) {
          return { username: token, password: '' };
        }
        return undefined;
      }
    });
    console.log('Push result:', pushResult);
    if (pushResult && pushResult.ok) {
      console.log('\n🎉 SUCCESS! Pushed successfully to https://github.com/msaisantoshAI/LevelUp-Designer.git !');
    }
  } catch (err) {
    console.error('Push error:', err.message);
  }
}

const token = process.argv[2] || process.env.GITHUB_TOKEN || '';
pushRepo(token);
