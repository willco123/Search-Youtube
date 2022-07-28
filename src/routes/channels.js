const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/', async (req,res) => {//Get channels
    const [rows,fields] = await db.query("SELECT * from channels");
    res.send(rows);
});

router.get('/columns', async (req, res) => {
    const channelColumns = await db.query('SHOW COLUMNS FROM mydb.channels')
    res.json(channelColumns[0])
})

router.post('/', async (req,res) => {
    var {channel_name} = req.body
    console.log(channel_name)
    await db.query('INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)', [channel_name]);

    res.status(201).send('Channel Successfully added')
});

router.delete('/:id', async (req,res) => {
  var id = req.params.id; 
  console.log(id)
  await db.query('DELETE FROM channels WHERE id = ?',[id])
  res.send('Item deleted')
  
})
module.exports = router;
                

