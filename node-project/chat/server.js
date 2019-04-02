const http = require("http");
const fs = require("fs");
const chat = require("./chat");
http
  .createServer(function(req, res) {
    switch (req.url) {
      case "/":
        sendFile("index.html", res);
        break;
      case "/subscribe":
        chat.subscribe(req, res);
        break;
      case "/publish":
        let body = "";
        req
          .on("readable", function() {
            body += req.read();
            if (body.length > 1e4) {
              res.statusCode = 413;
              res.end("Your message is too big for my little chat");
            }
          })
          .on("end", function() {
            try {
              body = body.split("null")[0];
              body = JSON.parse(body);
            } catch (e) {
              res.statusCode = 400;
              res.end("Bad request");
              return;
            }
            chat.publish(body.message);
            res.end("ok");
          });
        break;
      default:
        res.statusCode = 404;
        res.end("Not Found");
    }
  })
  .listen(3000);

function sendFile(fileName, res) {
  const fileStream = fs.createReadStream(fileName);
  fileStream.on("error", function() {
    res.statusCode = 500;
    res.end("Server Error");
  });
  fileStream.pipe(res);
}
