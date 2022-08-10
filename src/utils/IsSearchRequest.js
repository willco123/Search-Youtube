const {
  SearchDBFromTable,
  GetVideosWithFK,
  GetParentItemsByFK,
  GetChildItemsWithFK,
} = require("../models/db");

async function SearchChannels(query) {
  try {
    const column = Object.keys(query)[0];
    const value = `%${Object.values(query)[0]}%`;
    const results = await SearchDBFromTable("channels", column, value);

    for (let index in results) {
      const { id } = results[index];
      const videosWithFK = await GetChildItemsWithFK("videos", "title", id);
      delete results[index].id;
      results[index]["Videos"] = videosWithFK;
    }

    return results;
  } catch (err) {
    throw err;
  }
}

async function SearchVideos(query) {
  try {
    const column = Object.keys(query)[0];
    const value = `%${Object.values(query)[0]}%`;
    const results = await SearchDBFromTable("videos", column, value);

    for (let index in results) {
      const { channel_id } = results[index];
      const channelName = await GetParentItemsByFK(
        "channels",
        "channel_name",
        channel_id
      );
      delete results[index].id;
      delete results[index].channel_id;
      results[index]["Channel"] = channelName;
    }

    return results;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  SearchChannels,
  SearchVideos,
};
