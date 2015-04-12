var spawn = require('child_process').spawn
  , path = require('path')
  , gh = require('./git-hooked')
  , utils = require('./utils');

module.exports = function(hook) {
  hook = path.basename(hook);
  var targetHook = path.join(gh.root, '.hooks', hook);
  if(utils.fileExists(targetHook)) {
    spawn(targetHook, { stdio: 'inherit' })
      .on('exit', process.exit);
  }
};