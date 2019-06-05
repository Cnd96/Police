const {Policeman} = require('../models/policeman'); 
const express = require('express');
const router = express.Router();

  
router.get('/', async (req, res) => {
  var policeManNameQuery=req.query.policemanName;
  var policeStationQuery=req.query.policeStationId;
  // pattern= new RegExp(policeStationNameQuery, "i");
  pattern= new RegExp(policeManNameQuery, "i");
  const policeman = await Policeman.find({name:pattern , policeStation:policeStationQuery })
  .populate({path:'policeStation',populate:{path:'oicDivision'}})
  .sort('rank._id');
  res.send(policeman);
});

  
module.exports = router; 

 