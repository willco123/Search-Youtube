const express = require('express');
const router = express.Router();

const { GetSearchResults } = require('../services/ytService');
const { GetSearchStrings } = require('../helpers/fileHelpers');
const { searchParams, channelIDGCN, channelIDGMTB } = require('../models/searchModel');


router.get('/', async (_req, res, next) => {
  try{ 

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