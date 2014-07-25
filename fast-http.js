function fastHttp (port) {
    var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

  httpServer = http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);

    var contentTypesByExtension = {
      '.html': "text/html",
      '.css':  "text/css",
      '.js':   "text/javascript"
    };

    path.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream('404.html').pipe(response);
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          fs.createReadStream('500.html').pipe(response);
          return;
        }

        var headers = {};
        var contentType = contentTypesByExtension[path.extname(filename)];
        if (contentType) headers["Content-Type"] = contentType;
        response.writeHead(200, headers);
        response.write(file, "binary");
        response.end();
      });
    });
  });

  return httpServer.listen(parseInt(process.argv[2] || port, 10));
  }


module.exports = fastHttp;
