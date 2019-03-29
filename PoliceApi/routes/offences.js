const {Offence} = require('../models/offence'); 
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const offence = await Offence.findOne({  sectionOfAct: req.body.sectionOfAct,});

   if (offence) return res.status(400).send('Offence already exists.');
    
    let offenceToCreate = new Offence({ 
        sectionOfAct: req.body.sectionOfAct,
        provision: req.body.provision,
        amount: req.body.amount,
    });
    offenceToCreate = await offenceToCreate.save();
    
    res.send(offenceToCreate);
  });

router.get('/', async (req, res) => {
    const offence = await Offence.find();
    res.send(offence);
  });
module.exports = router; 