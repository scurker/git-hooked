var assert = require('assert')
  , mock = require('mock-fs')
  , fs = require('fs')
  , utils = require('../lib/utils')
  , gh = require('../lib/git-hooked')
  , runner;

describe('Git-Hooked runner', function() {

  before('require runner', function() {
    runner = require('../lib/hook-runner');
    mock({
      '.hooks': {
        'pre-commit': mock.file({
            content: '#!/bin/bash\n\necho "pre commit"',
            mode: 0755
          }),
        'pre-push': mock.file({
            content: '#!/bin/bash\n\nexit 1',
            mode: 0755
          })
      }
    });
  });

  after('restore fs', mock.restore);

  it.skip('executes hook successfully', function(done) {
    var exit = process.exit;
    process.exit = function(code) {
      assert.equal(0, code);
      done();
    };
    runner('pre-commit');
    process.exit = exit;
  });

  it.skip('fails if hook fails', function(done) {
    var exit = process.exit;
    process.exit = function(code) {
      assert.equal(0, code);
      done();
    };
    runner('pre-push');
    process.exit = exit;
  });

});