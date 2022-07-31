const express = require('express');
const router = express.Router();

const { GetSearchResults } = require('../services/ytService');
const { searchParams, searchArray, channelArray } = require('../models/searchModel');


router.get('/', async (_req, res, next) => {
  try{ 
    await GetSearchResults()
    res.send('Items stored in DB!');

  } catch (err){
    next(err);//add error handling for "exceed api quota"
  }
})




module.exports = router;