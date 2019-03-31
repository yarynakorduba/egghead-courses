// util helps to output the object
const util = require("util");

const obj = {
  a: 5,
  b: 6,
  inspect: function() {
    return 123;
  }
};

obj.self = obj;

console.log(util.inspect(obj));
