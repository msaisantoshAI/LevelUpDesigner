const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

async function initAndCommit() {
  const dir = __dirname;
  console.log('Project root:', dir);

  // 1. Init git repository if not already initialized
  try {
    await git.init({ fs, dir });
    console.log('[1/4] Git repository initialized successfully.');
  } catch (e) {
    console.log('[1/4] Git init notice:', e.message);
  }

  // 2. Stage all tracked project files (excluding .git, node_modules, .next)
  function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (
        file === 'node_modules' ||
        file === '.next' ||
        file === '.git' ||
        file === 'scratch' ||
        file.endsWith('.pem')
      ) {
        continue;
      }
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles);
      } else {
        const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
        arrayOfFiles.push(relPath);
      }
    }
    return arrayOfFiles;
  }

  const allFiles = getAllFiles(dir);
  console.log(`[2/4] Staging ${allFiles.length} project files...`);

  for (const filepath of allFiles) {
    await git.add({ fs, dir, filepath });
  }
  console.log('[2/4] All project files staged.');

  // 3. Commit
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Sai Santosh',
      email: 'saisantosh@levelupdesigners.com'
    },
    message: 'Initial commit: LevelUP Designers - Interactive Product Design Deck'
  });
  console.log('[3/4] Committed files. Commit SHA:', sha);

  // 4. Set remote URL
  const remoteUrl = 'https://github.com/msaisantoshAI/LevelUpDesigner.git';
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: remoteUrl,
      force: true
    });
    console.log(`[4/4] Remote "origin" set to ${remoteUrl}`);
  } catch (e) {
    console.log(`[4/4] Remote set notice:`, e.message);
  }

  console.log('\n✅ Git repository fully initialized, staged, committed, and linked to origin!');
}

initAndCommit().catch(err => {
  console.error('Error in git script:', err);
});
