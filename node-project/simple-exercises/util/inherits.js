const util = require("util");

function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  console.log("Walking " + this.name);
};

function Rabbit(name) {
  this.name = name;
}

util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function() {
  console.log("Jumping " + this.name);
};

const rabbit = new Rabbit("Rabbit Robin ");
rabbit.walk();
rabbit.jump();
