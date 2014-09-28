function fastHttp (port) {
    var http = require('http'),
    url = require('url'),
    path = require('path'),
    mime = require('mime'),
    fs = require('fs');

  httpServer = http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);


    path.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {'Content-Type': 'text/html'});
        path.exists('404.html', function(exists) {
          if(!exists) {
            response.end('Error 404');
            return;
          }
          fs.createReadStream('404.html').pipe(response);
        });
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, 'binary', function(err, file) {
        if(err) {
          response.writeHead(500, {'Content-Type': 'text/html'});
          path.exists('500.html', function(exists) {
            if(!exists) {
              response.end('Error 500');
              return;
            }
              fs.createReadStream('500.html').pipe(response);
          });
          return;
        }

        response.writeHead(200, {'Content-Type': mime.lookup(filename)});
        response.write(file, 'binary');
        response.end();
      });
    });
  });

  return httpServer.listen(parseInt(process.argv[2] || port, 10));
  }


module.exports = fastHttp;
