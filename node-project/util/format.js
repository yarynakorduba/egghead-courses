const util = require("util");

const str = util.format("My %s %d %j", "string", "...", { test: "obj" });

console.log(str);
