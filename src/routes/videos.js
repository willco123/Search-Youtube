const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { channelArray, searchArray } = require('../models/searchModel');

// console.log(searchArray)
// console.log(channelArray)

router.get('/', async (req,res) => {//Returns array
    
    try{
      const [rows] = await db.query("SELECT * from videos");
      
        console.log(searchArray)
        console.log(channelArray)
      return res.status(200).send(rows);
  
    }catch(err){
      console.log(err.stack);
    }
});

router.get('/:id', async (req,res) => {//Returns JSON

  try{
    const [rows] = await db.query("SELECT * from videos WHERE (id) = (?)", [req.params.id]);
    if (rows.length===0) return res.status(404).send('A video with that given id cannot be found');
    return res.send(rows[0]);
    }
    catch(err){
      console.log(err.stack);
    }
});

router.delete('/:id', async (req,res) => {//Deletes item from DB
  try{
    const id = req.params.id; 
    const deletedItem = await db.query('DELETE FROM videos WHERE id = (?)',[id]);
    if (deletedItem[0].affectedRows === 0)
      return res.status(404)
        .send('A video with the given ID was not found');

    return res.status(201).send('Record Successfully deleted');
  }catch(err){
    console.log(err.stack);
  }

  
})




module.exports = router;
                

