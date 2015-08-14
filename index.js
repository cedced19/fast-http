'use strict';
var http = require('http'),
    url = require('url'),
    path = require('path'),
    mime = require('mime'),
    fs = require('fs');

module.exports = function (port, root, wordy) {
    if (wordy === undefined) wordy = false;
    if (port === undefined) port = 80;
    var server = http.createServer(function (req, res) {

        var uri = url.parse(req.url).pathname,
            filename = path.join(root, uri);

        if (uri.charAt(uri.length - 1) === '/') {
            filename += 'index.html';
        }

        if (wordy) console.log('GET:' + uri + ' -> ' + filename);

        fs.exists(filename, function (exists) {
            if (!exists) {
                if (wordy) console.log('Error 404');
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Error 404');
                return;
            }
            if (fs.statSync(filename).isDirectory() && uri.charAt(uri.length - 1) !== '/') {
                if (wordy) console.log('Redirection 303');
                res.writeHead(303,{ 'Location': uri + '/' });
                res.end('Redirecting to: ' + uri + '/');
                return;
            }
            fs.readFile(filename, 'binary', function(err, file) {
                if(err) {
                    if (wordy) console.log('Error 500');
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error 500');
                    return;
                }
                if (wordy) console.log('Ok 200');
                res.writeHead(200, {
                    'Content-Type': mime.lookup(filename) + ';' + mime.charsets.lookup(mime.lookup(filename)) 
                });
                res.write(file, 'binary');
                res.end();
            });
        });
    });
    console.log('The server is now launch on: http://localhost:' + port);
    server.listen(port);
    return server;
}