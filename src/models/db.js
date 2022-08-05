const db = require('../config/db')
const table = 'channels'
const column = 'channel_name'

async function StoreData(dataYT){//Parses each page of data and stores entries one at a time
  for (let [title, [date, channelName]] of Object.entries(dataYT)){
    try{
      let id;
      let isUnique = await CheckUniqueness(table, column, channelName)
      if (isUnique){
        id = isUnique
      }else{
        let result = await db.query('INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)', [channelName]);
        id = result[0].insertId;
          
      }
      await db.query('INSERT INTO VIDEOS(title, date, channel_id)\
                      VALUES (?,?,?)', [title, date, id]);

    } catch(err){
      throw(err)
    }
  }
}

async function CheckUniqueness(table, column, value){
  try{

    myVal = await db.query('SELECT * from ?? where (??) = (?)', [table, column, value] )
    if (myVal[0][0] === undefined) return 0
    return myVal[0][0].id

  }catch(err){
    throw(err)
  }

}

module.exports = {
  StoreData,
}

