const express = require('express');
const router = express.Router();

const { GetSearchResults } = require('../services/ytService');



router.get('/', async (_req, res, next) => {
  try{
    await GetSearchResults()
    return res.status(200).send('Items stored in DB!');

  }catch (err){
    if (err.code == 403){
      res.status(403).send('Forbidden, Quota exceeded');
    }else{
      next(err)
    }
  }
})




module.exports = router;