const url = require("url");
const log = require("./log")(module);
module.exports = function(req, res) {
  log.debug(req.headers);

  const urlParsed = url.parse(req.url, true);
  debugger;
  if (urlParsed.pathname === "/echo" && urlParsed.query.message) {
    res.statusCode = 200;
    res.writeHead(200, "OK", { "Cache-control": "no-cache" }); //almost similar to the next row
    log.debug("status code 201");
    res.end(urlParsed.query.message);
    return;
  }
  log.error("Unknown URL");
  res.statusCode = 404;
  res.end("Page not found");

  console.log(urlParsed);
};
