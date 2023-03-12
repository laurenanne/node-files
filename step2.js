const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch {
    console.log(err);
  }
}

let char = process.argv[2];
if (char.startsWith("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
