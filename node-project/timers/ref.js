const http = require("http");
const server = new http.Server(function(req, res) {}).listen(3000);

setTimeout(function() {
  server.close();
}, 2500);

const timer = setInterval(function() {
  console.log(process.memoryUsage());
}, 2500);

// tells LibUV that this timer should not be consider
// while checking the watchers and deciding whether to continue running
timer.unref();
