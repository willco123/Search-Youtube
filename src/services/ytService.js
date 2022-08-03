require('dotenv').config()
const {google} = require('googleapis');

const { StoreVideos, StoreChannels } = require('../models/db'); 
const { searchParams, searchArray, channelArray } = require('../models/searchModel');

const apiKey = process.env.MYAPIKEY;
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});



async function QueryRecur(numberOfPages, response, nextPage){

  const titlesPublishedAt = [];//store data in dict
  response.data.items.map(item =>{
    titlesPublishedAt[item.snippet.title] = (item.snippet.publishedAt).substring(0,10);//ignore time just get date
  })
  StoreVideos(titlesPublishedAt);

  const channelNames = [];
  channelNames.push(response.data.items.snippet.channel_name)
  StoreChannels(channelNames)

  if (numberOfPages > 1){
    nextPage = response.data.nextPageToken;
    response = await youtube.search.list(searchParams);
    numberOfPages = --numberOfPages;
    return QueryRecur(numberOfPages, response, nextPage)
  }else{
    return 
  }
}


async function QueryYoutube(searchParams){
  var response = await youtube.search.list(searchParams);
    
  const totalResults = response.data.pageInfo.totalResults;
  const resultsPerPage = response.data.pageInfo.resultsPerPage;
  const numberOfPages = Math.floor(totalResults/resultsPerPage);

  var nextPage = response.data.nextPageToken;


  QueryRecur(numberOfPages, response, nextPage)

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