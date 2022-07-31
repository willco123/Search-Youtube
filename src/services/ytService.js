require('dotenv').config()
const {google} = require('googleapis');

const { StoreData } = require('../models/db'); 
const { searchParams, searchArray, channelArray } = require('../models/searchModel');

const apiKey = process.env.MYAPIKEY;
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

//How then to seperate logic from DB access here?
//do recursive func here to refactor       

async function QueryYoutube(searchParams){//Connect to youtube api and retrieves searched video titeles/dates and stores in DB
  //could perhaps refactor this into re-usuable code, though it does seem very yt specific
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

async function GetSearchResults(){
  for (let j in channelArray){
    searchParams.channeId = j;
    for (let i in searchArray){
      searchQuery = 'intitle:"' + searchArray[i] + '"';
      searchParams.q = searchQuery;
      await QueryYoutube(searchParams);
    };
  };
}


module.exports = {
  GetSearchResults  
}