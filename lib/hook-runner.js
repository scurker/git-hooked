var exec = require('child_process').execFile
  , path = require('path')
  , gh = require('./git-hooked')
  , utils = require('./utils');

module.exports = function(hook) {
  hook = path.basename(hook);
  var targetHook = path.join(gh.root, gh.userHooks, hook);
  if(utils.fileExists(targetHook)) {
    exec(targetHook, { stdio: 'inherit' });
  }
};