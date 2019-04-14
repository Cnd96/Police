const {Rank} = require('../models/rank');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    
    let rankToCreate = new Rank({ 
         _id: req.body._id,
        name: req.body.name,
    });
    rankToCreate = await rankToCreate.save();
    
    res.send(rankToCreate);
  });

router.get('/', async (req, res) => {
    const rank = await Rank.find();
    res.send(rank);
  });

module.exports = router;  