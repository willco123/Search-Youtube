const express = require('express');
const router = express.Router();

const { GetSearchResults } = require('../services/ytService');
const { GetSearchStrings } = require('../helpers/fileHelpers');
const { searchParams, channelIDGCN, channelIDGMTB } = require('../models/searchModel');


router.get('/', async (_req, res, next) => {
  try{ 

    //further refactor

    //ParseAndSearchChannels
    //  ParseAndSearchItems
    //"Business logic then completly isolated from route"
    //Add in validation here aswell
    searchParams.channelId = channelIDGCN
    searchArray = await GetSearchStrings();
    for (let i in searchArray){
      searchQuery = 'intitle:"' + searchArray[i] + '"';
      searchParams.q = searchQuery;
      await GetSearchResults(searchParams);
    }

    searchParams.channelId = channelIDGMTB;

    for (let i in searchArray){
      searchQuery = 'intitle:"' + searchArray[i] + '"';
      searchParams.q = searchQuery;
      await GetSearchResults(searchParams);
    }

    res.send('Items stored in DB!');

  } catch (err){
    next(err);
  }
})




module.exports = router;