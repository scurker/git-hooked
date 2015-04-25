var gh = require('./git-hooked')

module.exports = function(hook) {
  if(!gh.isGitProject || !gh.hasGitHooksDir()) {
    console.log('This doesn\'t look like a git project.');
  } else if(!gh.hasUserHooksDir()) {
    console.log('There are no git hooks to install.');
  } else {
    gh.installHooks(hook);
  }
};