const fs = require('fs/promises');

async function GetSearchStrings() {//Stores search params in array
  try {
    const dataStream = await fs.readFile('search_filter', { encoding: 'utf8' });
    const searchArray = dataStream.split("\n");
    return searchArray;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  GetSearchStrings,
}