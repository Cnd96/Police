const {PoliceStation} = require('../models/policeStation'); 
const express = require('express');
const router = express.Router();

  
router.get('/', async (req, res) => {
  var policeStationNameQuery=req.query.policeStationName;
  
  pattern= new RegExp(policeStationNameQuery, "i");
  const policeStation = await PoliceStation.find({policeStationName:pattern }).populate('oicDivision');
  res.send(policeStation);
});

  
module.exports = router; 

// var policeStationQuery=req.query.policeStationId;
//     const policeman = await Policeman
//     .find({policeStation:policeStationQuery, role:'TrafficPoliceman'})
//     .populate('policeStation');
//     res.send(policeman);