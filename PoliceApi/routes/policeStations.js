const {PoliceStation} = require('../models/policeStation'); 
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();


router.post('/', async (req, res) => {
    const policeStation = await PoliceStation.findOne({  policeStationName: req.body.policeStationName,});

   if (policeStation) return res.status(400).send('Police Station already exists.');
    
   const passwordSalt=await bcrypt.genSalt(10);
   const passwordHash=await bcrypt.hash(req.body.password,passwordSalt);

    let policeStationToCreate = new PoliceStation({ 
      policeStationName: req.body.policeStationName,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      password:passwordHash,
    });
    policeStationToCreate = await policeStationToCreate.save();
    
    policeStationToSend={
        policeStationName:policeStationToCreate.policeStationName,
        phoneNo:policeStationToCreate.phoneNo,
        address:policeStationToCreate.address,
    }
    res.send(policeStationToSend);
  });
  
router.get('/', async (req, res) => {
    const policeStation = await PoliceStation.find();
    res.send(policeStation);
  });


router.get('/:id', async (req, res) => {
    const policeStation = await PoliceStation.findById(req.params.id);
  
    if (!policeStation) return res.status(404).send('Police Station was not found.');
  
    res.send(policeStation);
  });
  
module.exports = router; 