const db = require("../config/db");

async function SearchChannels(query) {
  try {
    //use format /?column=value
    const column = Object.keys(query)[0];
    const value = `%${Object.values(query)[0]}%`;

    const results = await db.query(
      "SELECT * FROM channels WHERE (??) LIKE (?)",
      [column, value]
    );

    //await db.query("select * from ");

    //Get channed_ids
    //ammend channel ids to video json
    //get

    resultsNoID = results[0].map((item) => {
      //Iterate through results, dont return id
      delete item.id;
      return item;
    });

    return resultsNoID;
  } catch (err) {
    throw err;
  }
}

async function SearchVideos(query) {
  try {
    const column = Object.keys(query)[0];
    const value = `%${Object.values(query)[0]}%`;

    const results = await db.query("SELECT * FROM videos WHERE (??) LIKE (?)", [
      column,
      value,
    ]);

    for (let index in results[0]) {
      delete results[0][index].id;
      var channelName = await db.query(
        "select channel_name from channels where id = ? ",
        [results[0][index].channel_id]
      );
      console.log(channelName);
      results[0][index]["Channel"] = channelName[0][0].channel_name;
    }

    console.log(results[0]);
    return results[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  SearchChannels,
  SearchVideos,
};
