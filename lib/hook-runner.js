var cp = require('child_process')
  , path = require('path')
  , gh = require('./git-hooked')
  , utils = require('./utils');

module.exports = function(hook) {
  hook = path.basename(hook);
  var targetHook = path.join(gh.root, gh.userHooks, hook);
  if(utils.fileExists(targetHook)) {
    var opts = { stdio: 'inherit' };
    var cmd = path.relative(gh.root, targetHook);

    // Try to proxy out to git bash on windows -- if we can find it
    if(process.platform === 'win32') {

      var pf = process.env['programfiles']
        , pfx86 = process.env['programfiles(x86)']
        , gitBashPath = '/Git/bin/bash.exe';

      if(utils.fileExists(path.join(pf, gitBashPath))) {
        gitBashPath = path.join(pf, gitBashPath);
      } else if (utils.fileExists(path.join(pfx86, gitBashPath))) {
        gitBashPath = path.join(pfx86, gitBashPath);
      } else {
        console.log('git-hooked: Couldn\'t find git. Are you sure you have it installed?');
        process.exit(-1);
      }

      cmd = '"' + gitBashPath + '" -i ' + targetHook;
      opts.windowsVerbatimArguments = true;
    }

    var result = cp.exec(cmd, opts)
      .on('error', function(err) { throw err; })
      .on('close', process.exit);

    result.stdout.on('data', function(data) {
      console.log(data);
    });

    result.stderr.on('data', function(data) {
      console.log(data);
    });

    return result;
  }
};