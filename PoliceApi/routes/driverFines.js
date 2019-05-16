const {Driver} = require('../models/driverLicense'); 
const {Fine} = require('../models/fine');
const express = require('express');
const router = express.Router();


router.get('/:id', async (req, res) => {
    const driver = await Driver.findById(req.params.id);
  
    if (!driver) return res.status(401).send('Driver was not found.');

    let driverLicenseNumber=driver._id;

     let fines=await Fine.aggregate([
        {$match:{licenseNo: driverLicenseNumber}},
        {
            $project:{
                totalAmountPaid:1,
                vehicleNo:1,
                fineStatus:1,
                amount:1,
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            }
        },
        { $sort : { fineStatus : 1} }
    ]);
    let driverFines=await Driver.aggregate([
       {$match:{_id: driverLicenseNumber}},
       {
        $project:{
            Name:1,
            Address:1,
            DateOfBirth: { $dateToString: { format: "%Y-%m-%d", date: "$DateOfBirth" } },
            DateOfIssue:{ $dateToString: { format: "%Y-%m-%d", date: "$DateOfIssue" } },
            DateOfExpire:{ $dateToString: { format: "%Y-%m-%d", date: "$DateOfExpire" } },
            CatogeriesOfVehicles:1,
            fines:fines
        }
    },
    ]);
  
  
    res.send(driverFines[0]);
  });
module.exports = router; 