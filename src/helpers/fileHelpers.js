const fs = require("fs");
const fsp = fs.promises;

function ReadFileSyncByLine(inputFile) {
  //Stores search params in array
  try {
    const data = fs.readFileSync(inputFile, { encoding: "utf8" }).split("\r\n");
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function ReadFileAsyncByLine(inputFile) {
  try {
    const data = (await fsp.readFile(inputFile, { encoding: "utf8" })).split(
      "\r\n"
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  ReadFileSyncByLine,
  ReadFileAsyncByLine,
};
