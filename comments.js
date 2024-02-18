// Create web server
// Start web server
// Listen for incoming request
// If request is for /comments, send back comments
// If request is for /, send back index.html
// If request is for anything else, send back 404

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = require('./comments');

var server = http.createServer(function(request, response) {
  var urlParts = url.parse(request.url);

  if (urlParts.pathname === '/comments') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    response.end(JSON.stringify(comments));
  }
  else if (urlParts.pathname === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(fs.readFileSync('index.html'));
  }
  else {
    response.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    response.end('Not Found');
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');