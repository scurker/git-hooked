var gh = require('./git-hooked')

if(!gh.isGitProject || !gh.hasGitHooksDir()) {
  console.log('This doesn\t look like a git project.');
  process.exit(1);
}

if(!gh.hasUserHooksDir()) {
  console.log('There are no git hooks to install.');
  process.exit(1);
}

gh.setupHooks();