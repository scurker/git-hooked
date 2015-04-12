var fs = require('fs');

module.exports = {

  dirExists: function(path) {
    var dir;
    try {
      dir = fs.statSync(path);
    } catch(e) {
      if(e.code === 'ENOENT') {
        dir = false;
      }
    }
    return dir && dir.isDirectory();
  },

  fileExists: function(path) {
    var file;
    try {
      file = fs.statSync(path);
    } catch(e) {
      if(e.code === 'ENOENT') {
        file = false;
      }
    }
    return file && file.isFile();
  }

}