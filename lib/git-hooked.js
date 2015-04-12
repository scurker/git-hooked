var fs = require('fs')
  , path = require('path')
  , utils = require('./utils')
  , root = path.resolve(__dirname, '../')
  , userHooksDir = '.hooks';

var hooks = [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'post-commit',
  'pre-commit',
  'commit-msg',
  'prepare-commit-msg',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-receive',
  'update',
  'post-receive',
  'post-update',
  'pre-auto-gc',
  'post-rewrite'
];

var gh = {

  root: root,

  isGitProject: function() {
    return utils.dirExists(path.join(root, '.git'));
  },

  hasGitHooksDir: function() {
    return utils.dirExists(path.join(root, '.git/hooks'));
  },

  hasUserHooksDir: function() {
    return utils.dirExists(path.join(root, userHooksDir));
  },

  setupHooks: function() {
    var userHooks = fs.readdirSync(path.join(root, userHooksDir)) || [];

    hooks.forEach(function(hook) {
      if(utils.fileExists(path.join(root, userHooksDir, hook))) {
        var targetPath = path.join(root, '.git/hooks', hook);

        console.log('Installing ' + hook + ' hook...')

        fs.createReadStream(path.join(__dirname, 'hook.template.js'))
          .pipe(fs.createWriteStream(targetPath, hook))
        fs.chmod(targetPath, 0755);
      }

    });

  }

};

module.exports = gh;