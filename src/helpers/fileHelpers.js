const fs = require('fs');

function ReadFileSync(inputFile) {//Stores search params in array
  try {
    const data = fs.readFile(inputFile, { encoding: 'utf8' }).split("\r\n");
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  ReadFileSync,
}