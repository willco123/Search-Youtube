const express = require('express');
const router = express.Router();

const { GetSearchResults } = require('../services/ytService');



router.get('/', async (_req, res, next) => {
  try{//Could change it so search data is passed through req
    await GetSearchResults()
    res.send('Items stored in DB!');

  } catch (err){
    next(err);//add error handling for "exceed api quota"
  }
})




module.exports = router;