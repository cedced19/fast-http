#!/usr/bin/env node
'use strict';

var chalk = require('chalk'),
     fastHttp = require('fast-http'),
     opn = require('opn'),
     port = process.argv.slice(2),
     path = require('path'),
     fs = require('fs'),
     test = require('net').createServer();

if(port.length == 0){
    console.log(chalk.red('You must enter a port!'));
    process.exit();
}

test.once('error', function(err) {
    console.log(chalk.red('This port is already used!'));
    process.exit();
});

test.once('listening', function() {
  test.close();
  fastHttp(port);
  console.log('The server has just open on ' + chalk.green('http://localhost:' + port));

  opn('http://localhost:' + port);

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
              reload: !filepath.match(/\.(css|js)$/),
              contents: fs.readFileSync(filepath),
              update: function(_window, _resourceURL) {
                console.log("Resource " + _resourceURL + " has just been updated with new content");
              }
            });
          }
        );
});

test.listen(port[0]);





