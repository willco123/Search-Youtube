const express = require('express');
const router = express.Router();
const db = require('../startup/db');

router.get('/', async (req, res)=> {//query date or title

  try{//use format /?column=value

    const data = await db.query('SELECT * FROM videos WHERE (??) LIKE (?)', [Object.keys(req.query)[0], `%${Object.values(req.query)[0]}%`]);
    output = data[0].map(item => {
      delete item.id;
      return item;
    })
    res.send(output);

  }catch(err){
    console.log(err.stack);
  }
})

module.exports = router;