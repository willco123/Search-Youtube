const db = require("../config/db");
const table = "channels";
const column = "channel_name";

async function StoreData(dataYT) {
  for (let index in dataYT) {
    //jest doesn't like for of here
    let { title, date, channelTitle } = dataYT[index];
    try {
      let id;
      let isUnique = await CheckUniqueness(channelTitle);
      if (isUnique) {
        id = isUnique;
      } else {
        let result = await db.query(
          "INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)",
          [channelTitle]
        );
        id = result[0].insertId;
      }
      await db.query(
        "INSERT INTO VIDEOS(title, date, channel_id)\
                      VALUES (?,?,?)",
        [title, date, id]
      );
    } catch (err) {
      throw err;
    }
  }
}

async function CheckUniqueness(channelTitle) {
  try {
    selectItem = await db.query("SELECT * from ?? where (??) = (?)", [
      table,
      column,
      channelTitle,
    ]);
    isRow = selectItem[0][0];
    if (isRow === undefined) return 0;
    return isRow.id;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  StoreData,
};
