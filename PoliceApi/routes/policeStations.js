const {PoliceStation} = require('../models/policeStation'); 
const {OicDivision} =require('../models/oicDivision');
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();


router.post('/', async (req, res) => {
   const policeStation = await PoliceStation.findOne({  policeStationName: req.body.policeStationName,});
   if (policeStation) return res.status(400).send('Police Station already exists.');
    
   const oicDivision = await OicDivision.findOne({ oicDivisionName : req.body.oicDivisionName});
   if (!oicDivision) return res.status(400).send('Invalid Oic Division.');

   const passwordSalt=await bcrypt.genSalt(10);
   const passwordHash=await bcrypt.hash(req.body.password,passwordSalt);

    let policeStationToCreate = new PoliceStation({ 
      policeStationName: req.body.policeStationName,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      password:passwordHash,
      oicDivision:{
        _id: oicDivision._id
    },
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
    const policeStation = await PoliceStation.find().populate('oicDivision');
    res.send(policeStation);
  });

router.get('/:id', async (req, res) => {
    const policeStation = await PoliceStation.findById(req.params.id);
  
    if (!policeStation) return res.status(404).send('Police Station was not found.');
  
    res.send(policeStation);
  });
  
module.exports = router; 