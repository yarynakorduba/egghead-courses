const fs = require("fs");

fs.open(__filename, "r", function(arr, file) {
  console.log("IO!");
});

//right after IO
setImmediate(function() {
  console.log("immediate");
});

// before IO
process.nextTick(function() {
  req.en("readable", function() {});
});
