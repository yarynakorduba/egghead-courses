const http = require("http");
const fs = require("fs");
const dirFiles = require("./directoryFiles");

http
  .createServer(function(req, res) {
    switch (req.url) {
      case "/loadFileLinks":
        dirFiles.loadFiles(req, res);
      case "/":
        return fs.readdir(__dirname, (err, files) => {
          if (files.includes("index.html")) {
            new fs.ReadStream("index.html").pipe(res);
          } else {
            fs.createReadStream("listDir.html").pipe(res);
          }
        });
      default:
        return fs.readdir(__dirname, (err, files) => {
          if (files.includes(req.url.slice(1))) {
            new fs.ReadStream(req.url.slice(1)).pipe(res);
          } else {
            res.statusCode = 404;
            res.end("Not Found");
          }
        });
    }
  })
  .listen(3000);
