const {OicDivision} = require('../models/oicDivision');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const oicDivision = await OicDivision.findOne({  oicDivisionName: req.body.oicDivisionName,});

   if (oicDivision) return res.status(400).send('Oic division already exists.');
    
    let oicDivisionToCreate = new OicDivision({ 
        oicDivisionName: req.body.oicDivisionName,
        phoneNo:req.body.phoneNo,
        // inspectorName: req.body.inspectorName,
        // email: req.body.email,
    });
    oicDivisionToCreate = await oicDivisionToCreate.save();
    
    res.send(oicDivisionToCreate);
  });

router.get('/', async (req, res) => {
    const oicDivision = await OicDivision.find();
    res.send(oicDivision);
  });

module.exports = router;  