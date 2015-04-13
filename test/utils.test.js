var assert = require('assert')
  , mock = require('mock-fs')
  , utils = require('../lib/utils');

describe('File utils', function() {

  after('restore fs', mock.restore);

  before('create directory structure', function() {
    mock({ '.git/hooks': {
      'pre-commit': 'querty'
    }});
  });

  it('checks that a directory exists', function() {
    assert.equal(true, utils.dirExists('.git/hooks'));
  });

  it('checks that a directory does not exist', function() {
    assert.equal(false, utils.dirExists('.git/hooked'));
  });

  it('checks that a file exists', function() {
    assert.equal(true, utils.fileExists('.git/hooks/pre-commit'));
  });

  it('checks that a file does not exist', function() {
    assert.equal(false, utils.fileExists('.git/hooks/post-commit'));
  });

});