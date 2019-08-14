const express = require('express');
const router = express.Router();
const {Vehicle} = require('../models/vehicle'); 

router.post('/', async (req, res) => {
    let vehicle = new Vehicle({ 
        _id: req.body._id,
        vehicleType: req.body.vehicleType,
    });
    vehicle = await vehicle.save();
    
    res.send(vehicle);
  });
  
  module.exports = router; 