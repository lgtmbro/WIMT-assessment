const fs = require("fs");

fs.rm(
  "dist",
  {
    force: true,
    recursive: true,
  },
  (err) => {
    console.error(err);
  }
);
