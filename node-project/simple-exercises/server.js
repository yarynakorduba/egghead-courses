const log = require("./logger")(module);
const db = require("./db/index");
db.connect();
const User = require("./user/index");

function run() {
  const vasyl = new User("Vasyl");
  const petro = new User("Petro");

  vasyl.hello(petro);
  log(db.getPhrase("Run successful"));
}

//decide if it should be exported as a module or executed
if (module.parent) {
  exports.run = run;
} else {
  run();
}
