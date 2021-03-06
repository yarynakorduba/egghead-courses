const http = require("http");
const fs = require("fs");

http
  .createServer(function(req, res) {
    if (req.url === "/") {
      fs.readFile(
        "index.html",
        //callback function
        function(err, info) {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end("Server-side Error");
            return;
          }
          res.end(info);
        }
      );
    } else if (req.url === "/now") {
      res.end(new Date().toString());
    }
  })
  .listen(3000);
