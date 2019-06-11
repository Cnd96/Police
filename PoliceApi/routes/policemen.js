const {Policeman} = require('../models/policeman');
const {Rank} = require('../models/rank');
const {PoliceStation} = require('../models/policeStation');
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();


router.post('/', async (req, res) => {
    const policeman = await Policeman.findOne({  name: req.body._id,});
    if (policeman) return res.status(400).send('Policeman already exists.');

   const policeStation = await PoliceStation.findOne({ _id : req.body.policeStationId});
   if (!policeStation) return res.status(400).send('Invalid Police Station.');

   const rank = await Rank.findById(req.body.rankId);
  if (!rank) return res.status(400).send('Invalid rank.');
    
   const passwordSalt=await bcrypt.genSalt(10);
   const passwordHash=await bcrypt.hash(req.body.password,passwordSalt);

    let policemanToCreate = new Policeman({ 
        _id: req.body._id,
        name: req.body.name,
        address: req.body.address,
        nationalId: req.body.nationalId,
        dateOfBirth:new Date(req.body.dateOfBirth),
        phoneNo: req.body.phoneNo,
        password:passwordHash,
        rank: {
          _id: rank._id,
          name: rank.name
        },   
        policeStation:{
            _id: policeStation._id
        },
    });
    policemanToCreate = await policemanToCreate.save();
    
    policemanToSend={
        policemanName:policemanToCreate.Name,
        // phoneNo:policemanToCreate.phoneNo,
        // address:policemanToCreate.address,
        // role:policemanToCreate.role,
        // policeStation:policemanToCreate.policeStation,
    }
    res.send(policemanToSend);
  });
  
router.get('/', async (req, res) => {
    let policeStationQuery=req.query.policeStationId;
    const policeman = await Policeman
    .find({policeStation:policeStationQuery})
    .populate({path:'policeStation',populate:{path:'oicDivision'}})
    .sort('rank._id');

    // let name=policeman.name;
    // const policeStation = await PoliceStation.findOne({ _id :  policeman.policeStation._id});
    // const oicdivison= await OicDivision.findOne({  _id: policeman.policeStation.oicDivison});
    res.send(policeman);
  });
 

router.get('/:id', async (req, res) => {
    const policeman = await Policeman.findById(req.params.id).populate({path:'policeStation',populate:{path:'oicDivision'}});
    if (!policeman) return res.status(404).send('Policeman was not found.');
  
    res.send(policeman);
  });
  
module.exports = router;


// var policeStationQuery=req.query.policeStationId;
// var roleQuery= req.query.role;
// const policeman = await Policeman
// .find({policeStation:policeStationQuery, role:'TrafficPoliceman'})
// .populate('policeStation');
// res.send(policeman);