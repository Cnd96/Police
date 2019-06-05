const {PoliceStation} = require('../models/policeStation'); 
const jwt=require('jsonwebtoken')
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post('/', async (req, res) => {
    const policeStation = await PoliceStation.findOne({policeStationName: req.body.policeStationName,});
    if (!policeStation) return res.status(400).send('Inavlid police station.');
    
    const valid=await  bcrypt.compare( req.body.password,policeStation.password);
    if(!valid)return res.status(400).send('Inavlid password.');
    
    const token=jwt.sign({_id:policeStation.id , policeStationName : policeStation.policeStationName},'TrafficPolicePrivateKey');

    const tokenTosend={
        token:token
    }
    res.send(tokenTosend);
  });
  
  module.exports = router; 