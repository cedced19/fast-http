#!/usr/bin/env node
'use strict';

var colors = require('colors'),
    server = require('fast-http'),
    opn = require('opn'),
    path = require('path'),
    fs = require('fs'),
    program = require('commander'),
    port = 80,
    test = require('net').createServer();

program
    .version(require('./package.json').version)
    .option('-p, --port [number]', 'specified the port')
    .option('-o, --open', 'open in the browser')
    .parse(process.argv);

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
    port = program.port;
}

test.once('error', function(err) {
    console.log(colors.red('This port is already used!'));
    process.exit();
});

test.once('listening', function() {
    test.close();
    server(port, process.cwd());

    if (program.open){
        opn('http://localhost:' + port);
    }

    require('fb-flo')(
        process.cwd(),
        {
            port: 8888,
            host: 'localhost',
            verbose: false,
            glob: [
                '**/*.js',
                '**/*.css',
                '**/*.html'
            ]
        },
        function resolver(filepath, callback) {
            callback({
                resourceURL: path.extname(filepath),
                reload: !filepath.match(/\.(css)$/),
                contents: fs.readFileSync(filepath),
                update: function(_window, _resourceURL) {
                    console.log("Resource " + _resourceURL + " has just been updated with new content");
                }
            });
        }
    );
});

test.listen(port);





