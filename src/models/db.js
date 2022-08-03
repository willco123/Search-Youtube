const db = require('../config/db')

async function StoreVideos(titlesPublishedAt){//Parses each page of data and stores entries one at a time
  for (let [key, val] of Object.entries(titlesPublishedAt)){
    try{
    await db.query('INSERT INTO VIDEOS(title, date)\
                      VALUES (?,?)', [key, val]);
    } catch(err){
      next(err);
    }
  }
}

async function StoreChannels(channelNames){//Parses each page of data and stores entries one at a time
  for (let channelName in channelNames){
    try{
    await db.query('INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)', [channelName]);
    } catch(err){
      next(err);
    }
  }
}


module.exports = {
  StoreVideos,
  StoreChannels,
}

