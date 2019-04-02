const fs = require("fs");
const path = require("path");

exports.loadFiles = function(req, res) {
  fs.readdir(__dirname, (err, directoryFiles) => {
    if (err) throw err;
    res.end(
      JSON.stringify({
        directoryFiles,
        dirname: path.basename(__dirname) + "/"
      })
    );
  });
};
