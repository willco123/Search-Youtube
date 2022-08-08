const db = require("../config/db");
const table = "channels";
const column = "channel_name";

async function StoreData(dataYT) {
  //Parses each page of data and stores entries one at a time
  for (let [title, [date, channelName]] of Object.entries(dataYT)) {
    try {
      let id;
      let isUnique = await CheckUniqueness(channelName);
      if (isUnique) {
        id = isUnique;
      } else {
        let result = await db.query(
          "INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)",
          [channelName]
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

async function CheckUniqueness(channelName) {
  try {
    selectItem = await db.query("SELECT * from ?? where (??) = (?)", [
      table,
      column,
      channelName,
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
