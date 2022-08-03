const fs = require('fs');

function ReadFileSyncByLine(inputFile) {//Stores search params in array
  try {
    const data = fs.readFileSync(inputFile, { encoding: 'utf8' }).split("\r\n");
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  ReadFileSyncByLine,
}