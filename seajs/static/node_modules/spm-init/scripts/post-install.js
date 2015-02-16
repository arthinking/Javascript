#!/usr/bin/env node

var spmrc = require('spmrc');
var spawn = require('win-spawn');
var fs = require('fs');
var gitInstall = require('../lib/helper').gitInstall;

try {
  var spm = require('spm');
  spm.plugin.install({
    name: 'init',
    binary: 'spm-init',
    description: 'init a template'
  });
} catch(e) {
  console.log('  you need install spm to register the program');
  console.log();
  console.log('    \x1b[31m$ npm install spm -g\x1b[39m');
  console.log();
  console.log("  if you have installed spm, it maybe you haven't set a NODE_PATH environment variable");
  console.log();
}

// install spm-init templates
gitInstall('git://github.com/spmjs/template-cmd.git', '~/.spm/init/cmd');
