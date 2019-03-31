const util = require("util");

const phrases = {
  Hello: "Привіт",
  world: "світ"
};

function PhraseError(message) {
  this.message = message;
  Error.captureStackTrace(this, PhraseError);
}

util.inherits(PhraseError, Error);
PhraseError.prototype.name = "PhraseError";

function HttpError(status, message) {
  this.status = status;
  this.message = message;
}

util.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";

function getPhrase(name) {
  if (!phrases[name]) {
    throw new PhraseError("No such phrase " + name); // HTTP 500
  }
  return phrases[name];
}

function makePage(url) {
  if (url != "index.html") {
    throw new HttpError(404, "No such page"); // HTTP 404
  }
  return util.format("%s, %s!", getPhrase("Hell"), getPhrase("world"));
}

try {
  const page = makePage("index.html");
  console.log(page);
} catch (e) {
  if (e instanceof HttpError) {
    console.log(e.status, e.message);
  } else {
    console.log("Error %s\nmessage %s\nstack %s\n", e.name, e.message, e.stack);
  }
}
