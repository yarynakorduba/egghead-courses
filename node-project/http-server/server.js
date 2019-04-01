const http = require("http");
const url = require("url");
const request = require("./request");
const log = require("./log")(module);

const server = new http.Server(request);
log.info("Server is running");
server.listen(1337, "127.0.0.1");
