const {PoliceStation} = require('../models/policeStation'); 
const {Policeman} = require('../models/policeman');
const jwt=require('jsonwebtoken')
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post('/', async (req, res) => {
    const policeStation = await PoliceStation.findOne({policeStationName: req.body.policeStationName,});
    if (!policeStation) return res.status(400).send('Inavlid police station.');
    
    const valid=await  bcrypt.compare( req.body.password,policeStation.password);
    if(!valid)return res.status(400).send('Inavalid password.');
    
    const policeman=await Policeman.findOne({_id:req.body.policemanId}).populate({path:'policeStation',populate:{path:'oicDivision'}});
    if(!policeman) return res.status(404).send('Wrong policeman.');
    if (policeman.policeStation.policeStationName!=req.body.policeStationName) return res.status(404).send('Wrong policeman.');

    const policemanPasswordValid=await  bcrypt.compare( req.body.policemanPassword,policeman.password);
    if(!policemanPasswordValid)return res.status(404).send('Inavalid policeman password.');

    const token=jwt.sign({_id:policeStation.id , policeStationName : policeStation.policeStationName,loggedPoliceman:policeman._id},'TrafficPolicePrivateKey');

    const tokenTosend={
        token:token
    }
    res.send(tokenTosend);
  });
  
  module.exports = router; 