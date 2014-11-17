module.exports  = function (port, root) {
    var http = require('http'),
    url = require('url'),
    path = require('path'),
    mime = require('mime'),
    fs = require('fs');

    var server = http.createServer(function(req, res) {

        var uri = url.parse(req.url).pathname,
        filename = path.join(root, uri);

        if (uri.charAt(uri.length-1) == '/'){
                filename += 'index.html'
        }

        console.log('GET:' + uri + ' -> ' + filename);

        fs.exists(filename, function(exists) {
            if(!exists) {
                console.log('Error 404');
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Error 404');
                return;
            }
            if (fs.statSync(filename).isDirectory() && uri.charAt(uri.length-1) != '/') {
                console.log('Redirection 303');
                res.writeHead(303,{ 'Location': uri + '/' });
                res.end('Redirecting to: ' + uri + '/');
                return;
            }
            fs.readFile(filename,'binary', function(err, file) {
                    if(err) {
                          console.log('Error 500');
                          res.writeHead(500, {'Content-Type': 'text/plain'});
                          res.end('Error 500');
                          return;
                    }
                    console.log('Ok 200');
                    res.writeHead(200, {
                        'Content-Type': mime.lookup(filename) + ';' + mime.charsets.lookup(mime.lookup(filename)),
                        'X-Powered-By': 'fast-http'
                    });
                    res.write(file, 'binary');
                    res.end();
                });
            });
    });
    console.log('The server is now launch on: http://localhost:' + port);
    return server.listen(port);
}