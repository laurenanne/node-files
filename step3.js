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
  } catch (e) {
    console.log(e);
  }
}

function catWrite(path, content) {
  fs.writeFile(path, content, "utf8", function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log("Successfully wrote to file");
    }
  });
}

async function webCatWrite(path, url) {
  try {
    let content = await axios.get(url);
    catWrite(path, content.data);
  } catch (e) {
    console.log(e);
  }
}

let char2 = process.argv[2];
let char3 = process.argv[3];
let char4 = process.argv[4];

if (char2.startsWith("--out")) {
  if (char4.startsWith("http")) {
    webCatWrite(char3, char4);
  } else {
    catWrite(char3, char4);
  }
} else if (char2.startsWith("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
