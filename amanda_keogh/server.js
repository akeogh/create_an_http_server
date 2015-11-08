'use strict'
var http = require('http');
var fs = require('fs');
var respond = require(__dirname + "/lib/respond");

var server = http.createServer(function(req, res) {

  if (req.url === '/') {
    respond(res, 200, 'text/html', fs.readFileSync('index.html'));
  }

  if (req.url === '/style.css') {
    respond(res, 200, 'text.html', fs.readFileSync('style.css'));
  }

  if (req.url === '/time') {
    var time = new Date();
    time = time.getTime().toString();
    respond(res, 200, 'text/html', 'The current robot time is: ' + time);
  }

  if(req.url.substring(0, 5) === ('/name')) {
    var name;
    if(req.method === 'GET') {
      name = req.url.substring(6) || "world";
      respond(res, 200, 'text/html', 'Hello ' + name + '!');
    } else if (req.method === 'POST') {
      req.on('data', function(data) {
        var name = (JSON.parse(data.toString())['name']);
        respond(res, 200, 'text/html', 'Hello ' + name + '!');
      });
    }
  }
});

server.listen(3000, function() {
  console.log('server listening on port 3000');
});
