const {User} = require('../models/user'); 
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();


router.post('/', async (req, res) => {
    const user = await User.findOne({  name: req.body.name,});

   if (user) return res.status(400).send('User already exists.');
    
   const passwordSalt=await bcrypt.genSalt(10);
   const passwordHash=await bcrypt.hash(req.body.password,passwordSalt);

    let userToCreate = new User({ 
      userName: req.body.userName,
      password:passwordHash
    });
    userToCreate = await userToCreate.save();
    
    userToSend={
       userName:userToCreate.userName
    }
    res.send(userToSend);
  });
module.exports = router; 