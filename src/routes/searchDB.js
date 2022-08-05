const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res, next)=> {//query date or title

  try{//use format /?column=value

    const data = await db.query('SELECT * FROM videos WHERE (??) LIKE (?)', [Object.keys(req.query)[0], `%${Object.values(req.query)[0]}%`]);
    output = data[0].map(item => {
      delete item.id;
      return item;
    })
    return res.status(200).send(output);

  }catch(err){
    next(err.stack);
  }
})

module.exports = router;