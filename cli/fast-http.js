#!/usr/bin/env node
'use strict';

var colors = require('colors'),
    server = require('fast-http'),
    opn = require('opn'),
    path = require('path'),
    fs = require('fs'),
    program = require('commander'),
    nodemon = require('nodemon'),
    port = 80,
    test = require('net').createServer();

program
    .version(require('./package.json').version)
    .option('-p, --port [number]', 'specified the port')
    .option('-o, --open', 'open in the browser')
    .option('-n, --nodemon', 'use nodemon with your node project')
    .parse(process.argv);

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
    port = program.port;
}

test.once('error', function(err) {
    console.log('\n\'' + 'fast-http'.cyan + '\':' + 'This port is already used!\n'.red);
    process.exit(1);
});

test.once('listening', function() {
    test.close();
    if (program.nodemon) {
      nodemon({
        script: require(process.cwd() + '/package.json').main,
        ext: 'js json',
        ignore: 'vendor'
      });
      nodemon.on('start', function () {
        console.log('\'' + 'nodemon'.cyan + '\': App has started.\n');
      }).on('quit', function () {
        console.log('\n\'' + 'nodemon'.cyan + '\': App has quit.\n');
      }).on('restart', function (files) {
        console.log('\n\'' + 'nodemon'.cyan + '\': App restarted due to: ' + files);
      });
    } else {
      server(port, process.cwd());
    }

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
                contents: fs.readFileSync(filepath),
                reload: true,
                update: function(_window, _resourceURL) {
                    console.log('Resource ' + _resourceURL + ' has just been updated with new content');
                }
            });
        }
    );
});

test.listen(port);
