const fs = require("fs");
const http = require("http");

new http.Server(function(req, res) {
  if (req.url == "/index.html") {
    const file = new fs.ReadStream("index.html");
    sendFile(file, res);
  }
}).listen(3001);

function sendFile(file, res) {
  file.on("readable", write);
  function write() {
    file.pipe(res);
    file.pipe(res);

    file.on("error", function(err) {
      res.statusCode = 500;
      res.end("Server Error");
      console.error(err);
    });

    file
      .on("open", function() {
        console.log("open");
      })
      .on("close", function() {
        console.log("close");
      });

    // close for res is a signal that the connection was interrupted
    res.on("close", function() {
      file.destroy();
    });
  }
  file.on("end", function() {
    res.end();
  });
}
