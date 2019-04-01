const EventEmitter = require("events").EventEmitter;

const server = new EventEmitter();
const db = new EventEmitter();
db.setMaxListeners(0);

server.on("request", function(request) {
  request.approved = true;
});
server.on("request", function(request) {
  console.log(request);
});

server.emit("request", { from: "Client 1" });
server.emit("request", { from: "Client 2" });

console.log(
  server.listeners("request"),
  server.listenerCount(server, "request")
);

function Request() {
  const self = this;
  this.bigData = new Array(1e6).join("*");
  this.send = function(data) {
    console.log(data);
  };

  function onData(info) {
    self.send(info);
  }

  this.end = function() {
    db.removeListener("data", onData);
  };
  db.on("data", onData);
}

setInterval(function() {
  const request = new Request();
  request.end();
  console.log(process.memoryUsage().heapUsed);
  console.log(db);
}, 200);
