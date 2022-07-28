const db = require('../config/db')

async function StoreData(titlesPublishedAt){//Parses each page of data and stores entries one at a time
  for (let [key, val] of Object.entries(titlesPublishedAt)){
    try{
    await db.query('INSERT INTO VIDEOS(title, date)\
                      VALUES (?,?)', [key, val]);
    } catch(err){
      console.log(err);
    }
  }
}        

module.exports = {
  StoreData,
}