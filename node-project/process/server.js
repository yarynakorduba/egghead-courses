const http = require("http");
const opts = require("optimist").argv;
console.log(process.argv);
console.log(process.env);

http
  .createServer(function(req, res) {
    if (process.env.NODE_ENV === "production")
      res.end("The server is running! - PRODUCTION");
    else if (process.env.NODE_ENV === "development")
      res.end("The server is running! - DEVELOPMENT");
  })
  .listen(opts.port);
