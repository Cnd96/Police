const {Driver} = require('../models/driverLicense'); 
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
 
    let driverToCreate = new Driver({ 
        _id: req.body._id,
        Name: req.body.Name,
        Address: req.body.Address,
        NatonalId: req.body.NatonalId,
        DateOfBirth: req.body.DateOfBirth,
        DateOfIssue: req.body.DateOfIssue,
        DateOfExpire: req.body.DateOfExpire,
        CatogeriesOfVehicles: req.body.CatogeriesOfVehicles,

    });
    driverToCreate = await driverToCreate.save();
    
    res.send(driverToCreate);
  });

router.get('/', async (req, res) => {
    const driver = await Driver.find();
    res.send(driver);
  });

router.get('/:id', async (req, res) => {
    const driver = await Driver.findById(req.params.id);
  
    if (!driver) return res.status(404).send('Police Station was not found.');
  
    res.send(driver);
  });
module.exports = router; 