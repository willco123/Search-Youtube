require('dotenv').config()
const {google} = require('googleapis');

const { StoreData } = require('../models/db'); 
const { searchParams, searchArray } = require('../models/searchModel');

const apiKey = process.env.MYAPIKEY;
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});



async function QueryRecur(numberOfPages, response, nextPage){

  try{  
    const dataYT = [];//store data in dict
    response.data.items.map(item =>{
      dataYT[item.snippet.title] = [(item.snippet.publishedAt).substring(0,10), item.snippet.channelTitle];//ignore time just get date
    })
    await StoreData(dataYT)


    if (numberOfPages > 1){
      nextPage = response.data.nextPageToken;

      await process.nextTick(() => {});//fixes a jest open handle issue, something to do with axios
      response = await youtube.search.list(searchParams);
      
      numberOfPages = --numberOfPages;
      return await QueryRecur(numberOfPages, response, nextPage)

    }else{
      return 
    }}
  catch(err){
    throw(err)
  }
}


async function QueryYoutube(searchParams){
  try{

    await process.nextTick(() => {});
    var response = await youtube.search.list(searchParams);
    
    const totalResults = response.data.pageInfo.totalResults;
    const resultsPerPage = response.data.pageInfo.resultsPerPage;
    const numberOfPages = Math.floor(totalResults/resultsPerPage);
  
    var nextPage = response.data.nextPageToken;
  
  
    await QueryRecur(numberOfPages, response, nextPage)
  
    delete searchParams.pageToken;

  }catch(err){
    if (err.code == 403){
      throw (err)
    }else{
      console.log(err.stack)
    }
  }

}


async function GetSearchResults(){

  for (let i in searchArray){
    searchQuery = 'intitle:"' + searchArray[i] + '"';
    searchParams.q = searchQuery;
    await QueryYoutube(searchParams);
  };

};



module.exports = {
  GetSearchResults  
}