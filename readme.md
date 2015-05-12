git-hooked [![Travis CI Build Status](https://travis-ci.org/scurker/git-hooked.svg?branch=master)](https://travis-ci.org/scurker/git-hooked) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/pj5qytca6dkh1d4a/branch/master?svg=true)](https://ci.appveyor.com/project/scurker/git-hooked)
==========

git-hooked is a hooks manager for your repositories. You can store hooks in a `.hooks` directory in your repository and install them via git-hooked via the command line or automatically as part of your build process.

## Getting Started

`npm install git-hooked -g`

Once installed, you can install all hooks from the command line.

`git-hooked install`

Or, you can just install a single hook.

`git-hooked install pre-commit`

## Hooks

Every hook listed in the [documentation](http://git-scm.com/docs/githooks) is available:

* applypatch-msg
* pre-applypatch
* post-applypatch
* pre-commit
* prepare-commit-msg
* commit-msg
* post-commit
* pre-rebase
* post-checkout
* post-merge
* pre-push
* pre-receive
* update
* post-receive
* post-update
* push-to-checkout
* pre-auto-gc
* post-rewrite
* rebase

## User Hooks

`git-hooked` does not replace existing hooks, but they are backed up to `hookname.user`. At this time, user hooks are not run as part of the git-hooked process but that may change in future versions.