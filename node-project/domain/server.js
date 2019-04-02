const http = require("http");
const fs = require("fs");

function handler(req, res) {
  if (req.url === "/") {
    fs.readFile("inde", function(err, content) {
      if (err) {
        throw err;
      }
      res.end(content);
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
}

const server = new http.createServer(handler);
module.exports = server;
