var child = require('child_process')
  , assert = require('assert')
  , mock = require('mock-fs')
  , utils = require('../lib/utils')
  , gh = require('../lib/git-hooked')
  , runner;

describe('Git-Hooked runner', function() {

  afterEach('restore fs', mock.restore);

  before('require runner', function() {
    runner = require('../lib/hook-runner');
  });

  beforeEach(function() {
    mock({
      '.hooks': {
        'pre-commit': '#!/bin/bash\n\necho "pre commit"',
        'pre-push': '#!/bin/bash\n\nexit 1'
      },
      '.git/hooks': {}
    });
  });

  it.skip('executes hook', function() {
    runner('pre-commit');
  });

  it.skip('fails if hook fails', function() {
    runner('pre-push');
  });

});