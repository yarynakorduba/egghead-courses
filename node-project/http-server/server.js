const http = require("http");
const url = require("url");
const request = require("./request");
const debug = require("debug")("server");

const server = new http.Server(request);
debug("Server is running");
server.listen(1337, "127.0.0.1");
