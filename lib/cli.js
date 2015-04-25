#!/usr/bin/env node

var pkg = require('../package.json')
  , yargs = require('yargs')
  , install = require('./install');

yargs
  .command('install', 'installs all hooks')
  .command('install [hook]', 'installs specified hook')
  .example('git-hooked install pre-commit')
  .alias('h', 'help')
  .help('h')
  .alias('v', 'version')
  .version(function() { return 'git-hooked v' + pkg.version; })

var args = yargs.argv
  , commands = args._;

if(commands.length && commands[0] === "install") {
  install(commands[1]);
} else {
  console.log(yargs.help());
}