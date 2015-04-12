var assert = require('assert')
  , mock = require('mock-fs')
  , utils = require('../lib/utils');

afterEach(mock.restore);

describe('File utils', function() {

  beforeEach(function() {
    mock({ '.git/hooks': {
      'pre-commit': 'querty'
    }});
  });

  it('should check that a directory exists', function() {
    assert.equal(true, utils.dirExists('.git/hooks'));
  });

  it('should check that a directory does not exist', function() {
    assert.equal(false, utils.dirExists('.git/hooked'));
  });

  it('should check that a file exists', function() {
    assert.equal(true, utils.fileExists('.git/hooks/pre-commit'));
  });

  it('should check that a file does not exist', function() {
    assert.equal(false, utils.fileExists('.git/hooks/post-commit'));
  });

});