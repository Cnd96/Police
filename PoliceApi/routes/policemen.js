const {Policeman} = require('../models/policeman');
const {PoliceStation} = require('../models/policeStation');
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();


router.post('/', async (req, res) => {
    const policeman = await Policeman.findOne({  _id: req.body._id,});
    if (policeman) return res.status(400).send('Policeman already exists.');

   const policeStation = await PoliceStation.findOne({ _id : req.body.policeStationId});
   if (!policeStation) return res.status(400).send('Invalid Police Station.');
    
   const passwordSalt=await bcrypt.genSalt(10);
   const passwordHash=await bcrypt.hash(req.body.password,passwordSalt);

    let policemanToCreate = new Policeman({ 
        _id: req.body._id,
        name: req.body.name,
        address: req.body.address,
        natonalId: req.body.natonalId,
        dateOfBirth: req.body.dateOfBirth,
        phoneNo: req.body.phoneNo,
        password:passwordHash,
        role:req.body.role,    
        policeStation:{
            _id: policeStation._id
        },
    });
    policemanToCreate = await policemanToCreate.save();
    
    policemanToSend={
        policemanName:policemanToCreate.Name,
        phoneNo:policemanToCreate.phoneNo,
        address:policemanToCreate.address,
        role:policemanToCreate.role,
        policeStation:policemanToCreate.policeStation,
    }
    res.send(policemanToSend);
  });
  
router.get('/', async (req, res) => {
    const policeman = await Policeman
    .find()
    .populate('policeStation');
    res.send(policeman);
  });


// router.get('/:id', async (req, res) => {
//     const policeman = await Policeman.findById(req.params.id);
  
//     if (!policeman) return res.status(404).send('Police Station was not found.');
  
//     res.send(policeman);
//   });
  
module.exports = router; 