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

//   let categories=['B1','A1','G1'];
//   // let a=[{CatogeriesOfVehicles:'B1'},{CatogeriesOfVehicles:'G1'}];
//   let a=[];
//   for(let i=0;i<categories.length;i++){
//     let a1={CatogeriesOfVehicles:categories[i]}
//     a.push(a1);
// }


  
//     const driver = await Driver.find()
//     .or(a);

  const driver = await Driver.find();
    res.send(driver);
  });





  
router.get('/:id', async (req, res) => {
    // const driver = await Driver.findById(req.params.id);
  
    // if (!driver) return res.status(404).send('Driver was not found.');
    let driver=await Driver.aggregate([
      {$match:{_id: (req.params.id)}},
      {
        $project:{
          Name:1,
          month: { $month: "$DateOfBirth" },
          year: { $year: "$DateOfBirth" },
          dayOfMonth: { $dayOfMonth: "$DateOfBirth" },
          hour: { $hour: "$date" },
           minutes: { $minute: "$date" },
        }
    },
  ]);
    
    res.send(driver);
  });
module.exports = router; 