#!/usr/bin/env node
'use strict';

var server = require('fast-http'),
    opn = require('opn'),
    program = require('commander'),
    port = 80,
    test = require('net').createServer();

program
    .version(require('./package.json').version)
    .option('-p, --port [number]', 'specified the port')
    .option('-o, --open', 'open in the browser')
    .option('-w, --wordy', 'specified if it\'ll log all request')
    .parse(process.argv);

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
    port = program.port;
}

test.once('error', function(err) {
    console.log('This port is already used!');
    process.exit(1);
});

test.once('listening', function() {
    test.close();
    
    server(port, process.cwd(), program.wordy);
    

    if (program.open){
        opn('http://localhost:' + port);
    }
});

test.listen(port);
