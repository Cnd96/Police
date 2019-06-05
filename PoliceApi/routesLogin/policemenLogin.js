const {Policeman} = require('../models/policeman'); 
const jwt=require('jsonwebtoken')
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post('/', async (req, res) => {
    const policeman = await Policeman.findOne({_id: req.body.policemanId,}).populate({path:'policeStation',populate:{path:'oicDivision'}});
    if (!policeman) return res.status(404).send('Inavlid policeman.');
    
    const valid=await  bcrypt.compare( req.body.password,policeman.password);
    if(!valid)return res.status(404).send('Inavlid password.');
    
    const token=jwt.sign({_id:policeman.id , policemanName : policeman.policemanName},'TrafficPolicePrivateKey');

    const tokenTosend={
        token:token
    }

    res.send(policeman);
  });
  module.exports = router; 