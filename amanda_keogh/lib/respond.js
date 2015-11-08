// Sends a simple HTTP response
module.exports = exports = function respond(res, status, contentType, data) {
  res.writeHead(status, {
    'Content-Type': contentType
  });
  res.write(data || 'not found');
  res.end();
}
