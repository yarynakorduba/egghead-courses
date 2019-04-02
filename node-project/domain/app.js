const domain = require("domain");
const serverDomain = domain.create();

const server = require("./server");

serverDomain.on("error", function(err) {
  console.error("Domain caught an error: ", err);
});

serverDomain.run(function() {
  server.listen(3000);
});
