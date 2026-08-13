@echo off
echo =======================================================
echo LevelUP Designers - GitHub Deployment
echo =======================================================
echo Target: https://github.com/msaisantoshAI/LevelUpDesigner.git
echo.
set /p GITHUB_TOKEN="Enter your GitHub Personal Access Token (or press Enter if configured): "
node push_git.js %GITHUB_TOKEN%
pause
