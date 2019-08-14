const {Fine} = require('../models/fine'); 
const {CourtCase} =require('../models/courtCase');
const {Vehicle} =require('../models/vehicle');
const request=require('request');
const express = require('express');
const router = express.Router();

  
router.get('/', async (req, res) => {
    let vehicleNumberList=[];
    let vehicleDataToSend=[
      {  vehicleType: 'Bike', count: 0},
      {  vehicleType: 'Bus', count: 0  },
      {  vehicleType: 'Van', count: 0 },
      {  vehicleType: 'Three Wheeler', count: 0 },
      {  vehicleType: 'Car', count: 0  },
      {  vehicleType: 'Lorry', count: 0 },
      {  vehicleType: 'Container', count: 0 },  
    ];
    
    let vehicleNumbersInFines =await Fine.aggregate([
        {
            $project:{
                vehicleNo:1
            }
        },
    ]);
    let vehicleNumbersInCourtCases =await CourtCase.aggregate([
        {
            $project:{
                vehicleNo:1
            }
        },
    ]);
    vehicleNumberList=vehicleNumbersInCourtCases.concat(vehicleNumbersInFines);

    let vehicles=[];
    vehicles=await Vehicle.find();
    let totalVehicles=0;

    vehicleNumberList.forEach(vehicleNumber=>{
        let vehicle=vehicles.find(vehicle=>vehicle._id===vehicleNumber.vehicleNo);
        vehicleDataToSend.forEach(vehicleData=>{
            if(vehicleData.vehicleType==vehicle.vehicleType){
                vehicleData.count++;
                totalVehicles++;
                return;
            } 
        })
    })

    vehicleDataToSend.forEach(vehicleData=>{
        let percentage=vehicleData.count/totalVehicles*100;
        percentage=percentage.toFixed(2);
        vehicleData.vehicleType=vehicleData.vehicleType+' '+percentage+'%';
    })
    


    res.send(vehicleDataToSend);
});




module.exports = router;  

