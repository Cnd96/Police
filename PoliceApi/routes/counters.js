const express = require('express');
const router = express.Router();
const {Counter} = require('../models/counter'); 

router.post('/', async (req, res) => {
    let counter = new Counter({ 
        name: req.body.name,
        value: req.body.value,
    });
    counter = await counter.save();
    
    res.send(counter);
  });
  
  module.exports = router; 