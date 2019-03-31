const phrases = require("./uk");

function User(name) {
  this.name = name;
}

User.prototype.hello = function(who) {
  console.log(phrases.Hello + ", " + who.name);
};

console.log("User is required!");

exports.User = User;
