const {Offence} = require('../models/offence'); 
const express = require('express');
const router = express.Router();
const auth =require('../middleware/adminAuth');

router.post('/', async (req, res) => {
    const offence = await Offence.findOne({ _id: req.body.sectionOfAct,});
   if (offence) return res.status(400).send('Offence already exists.');
    
    let offenceToCreate = new Offence({ 
        _id: req.body.sectionOfAct,
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

router.get('/:id', async (req, res) => {
    const offence = await Offence.findById(req.params.id);
  
    if (!offence) return res.status(404).send('Offence was not found.');
  
    res.send(offence);
    
  });
router.put('/:id',async (req, res) => {
  const offence = await Offence.findByIdAndUpdate(req.params.id,
    { 
      provision: req.body.provision,
      amount: req.body.amount
    }, { new: true });

  if (!offence) return res.status(404).send('The offence with the given ID was not found.');
  res.send(offence);
  });

module.exports = router;  
