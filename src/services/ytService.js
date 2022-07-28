require('dotenv').config()
const {google} = require('googleapis');

const db = require('../config/db');

const apiKey = process.env.MYAPIKEY;
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

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

async function GetSearchResults(searchParams){//Connect to youtube api and retrieves searched video titeles/dates and stores in DB
  var response = await youtube.search.list(searchParams);
    
  const totalResults = response.data.pageInfo.totalResults;
  const resultsPerPage = response.data.pageInfo.resultsPerPage;
  const numberOfPages = Math.floor(totalResults/resultsPerPage);

  var nextPage = response.data.nextPageToken;


  const titlesPublishedAt = [];//store data in dict
  response.data.items.map(item =>{
    titlesPublishedAt[item.snippet.title] = (item.snippet.publishedAt).substring(0,10);
  })
  StoreData(titlesPublishedAt);


  for(let i = 1; i < numberOfPages; i++){//Iterate through pages as maxresults = 50
    searchParams['pageToken'] = nextPage;
    response = await youtube.search.list(searchParams);

    const titlesPublishedAt = [];
    response.data.items.map(item =>{ 
      titlesPublishedAt[item.snippet.title] = (item.snippet.publishedAt).substring(0,10);
    })

    nextPage = response.data.nextPageToken;
    StoreData(titlesPublishedAt);
  }

  delete searchParams.pageToken;
}

module.exports = {
  StoreData,
  GetSearchResults  
}