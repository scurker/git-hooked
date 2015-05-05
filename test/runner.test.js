var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , utils = require('../lib/utils')
  , gh = require('../lib/git-hooked')
  , runner = require('../lib/hook-runner');

describe('Git-Hooked runner', function() {

  before('setup fixtures', function() {
    fs.mkdirSync(path.resolve(process.cwd(), '.hooks'));
    
    var h1 = fs.readFileSync(path.resolve(__dirname, 'fixtures/pre-commit'));
    var h2 = fs.readFileSync(path.resolve(__dirname, 'fixtures/pre-push'));

    fs.writeFileSync(path.resolve(process.cwd(), gh.userHooks, 'pre-commit'), h1);
    fs.writeFileSync(path.resolve(process.cwd(), gh.userHooks, 'pre-push'), h2);

    fs.chmodSync(path.resolve(process.cwd(), gh.userHooks, 'pre-commit'), 0755);
    fs.chmodSync(path.resolve(process.cwd(), gh.userHooks, 'pre-push'), 0755);
  });

  after('remove fixtures', function() {
    var files = fs.readdirSync(path.resolve(process.cwd(), gh.userHooks));

    files.forEach(function(file) {
      fs.unlinkSync(path.join(process.cwd(), gh.userHooks, file));
    });

    fs.rmdirSync(path.resolve(process.cwd(), gh.userHooks));
  });

  it('executes hook successfully', function(done) {
    this.timeout(15000);
    var exit = process.exit;
    process.exit = function(code) {
      assert.equal(0, code);
      done();
    };
    runner('pre-commit');
    process.exit = exit;
  });

  it('fails if hook fails', function(done) {
    this.timeout(15000);
    var exit = process.exit;
    process.exit = function(code) {
      assert.equal(1, code);
      done();
    };
    runner('pre-push');
    process.exit = exit;
  });

});
