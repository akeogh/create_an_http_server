var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    respond(200, 'text/html', 'hello root!');
  }

  if (req.url === '/time') {
    var d = new Date()
    respond(200, 'text/html', d.getTime().toString());
  }

  if(req.url.includes('/name')) {
    if(req.method === 'GET') {
      respond(200, 'text/html', 'hello name (get)!');
    } else if (req.method === 'POST') {
      console.log('acknowledged');
      respond(200, 'application/JSON', JSON.stringify({hello: "JSON!"}));
    }
  }

  function respond(status, contentType, data) {
    res.writeHead(status, {
      'Content-Type': contentType
    });
    res.write(data || 'not found');

    res.end();
  }

});

server.listen(3000, function() {
  console.log('server listening on port 3000');
});
