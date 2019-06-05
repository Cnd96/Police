const {User} = require('../models/user'); 
const jwt=require('jsonwebtoken');
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findOne({userName: req.body.userName,});
    if (!user) return res.status(400).send('Inavlid user.');
    
    const valid=await  bcrypt.compare( req.body.password,user.password);
    if(!valid)return res.status(400).send('Inavlid password .');
    
    const token=jwt.sign({_id:user.id,userName:user.userName,policemanName : "Admin",isAdmin:true},'TrafficPolicePrivateKey');

    const tokenTosend={
        token:token
    }
    res.send(tokenTosend);
  });
  
  module.exports = router; 