#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var fastHttp = require('fast-http');
var opn = require('opn');
var port = process.argv.slice(2);

if(port.length == 0){
    console.log(chalk.red('You must enter a port!'));
    process.exit();
}


fastHttp(port);
console.log('The server has just open on ' + chalk.green('http://localhost:' + port));
opn('http://localhost:' + port);

