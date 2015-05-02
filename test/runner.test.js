var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , utils = require('../lib/utils')
  , gh = require('../lib/git-hooked')
  , runner = require('../lib/hook-runner');

describe('Git-Hooked runner', function() {

  before('setup fixtures', function() {
    fs.mkdirSync(path.resolve(process.cwd(), '.hooks'));

    var c1 = fs.createReadStream(path.resolve(__dirname, 'fixtures/pre-commit'));
    var c2 = fs.createReadStream(path.resolve(__dirname, 'fixtures/pre-push'));

    c1.pipe(fs.createWriteStream(path.resolve(process.cwd(), gh.userHooks, 'pre-commit')));
    c2.pipe(fs.createWriteStream(path.resolve(process.cwd(), gh.userHooks, 'pre-push')));

    c1.on('end', function() {
      fs.chmodSync(path.resolve(process.cwd(), gh.userHooks, 'pre-commit'), 0755);
    });

    c2.on('end', function() {
      fs.chmodSync(path.resolve(process.cwd(), gh.userHooks, 'pre-push'), 0755);
    });

  });

  after('remove fixtures', function() {
    var files = fs.readdirSync(path.resolve(process.cwd(), gh.userHooks));

    files.forEach(function(file) {
      fs.unlinkSync(path.join(process.cwd(), gh.userHooks, file));
    });

    fs.rmdirSync(path.resolve(process.cwd(), gh.userHooks));
  });

  it('executes hook successfully', function(done) {
    this.timeout(5000);
    var exit = process.exit;
    process.exit = function(code) {
      assert.equal(0, code);
      done();
    };
    runner('pre-commit');
    process.exit = exit;
  });

  it('fails if hook fails', function(done) {
    this.timeout(5000);
    var exit = process.exit;
    process.exit = function(code) {
      assert.equal(1, code);
      done();
    };
    runner('pre-push');
    process.exit = exit;
  });

});