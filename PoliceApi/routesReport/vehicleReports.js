const {Fine} = require('../models/fine'); 
const {CourtCase} =require('../models/courtCase');
const {Vehicle} =require('../models/vehicle');
const {Offence} =require('../models/offence');
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

  
router.get('/vehicleTypeOffences', async (req, res) => {
    // let vehicleTypeQuery=req.query.vehicleType;
    // console.log(vehicleTypeQuery)
    let vehicleTypes=['Van','Bus','Lorry','Container','Car','Bike','Three Wheeler']
    let vehicleNumberList=[];//with offences commited
    let vehicleTypeOffences=[];

    
    let vehicleNumbersInFines =await Fine.aggregate([
        {
            $project:{
                offences:1,
                vehicleNo:1
            }
        },
    ]);
    let vehicleNumbersInCourtCases =await CourtCase.aggregate([
        {
            $project:{
                offences:1,
                vehicleNo:1
            }
        },
    ]);
    vehicleNumberList=vehicleNumbersInCourtCases.concat(vehicleNumbersInFines);
    vehicles=await Vehicle.find();


    vehicleNumberList.forEach(vehicleWithOffences=>{
        let vehicle=vehicles.find(vehicle=>vehicle._id===vehicleWithOffences.vehicleNo);
        vehicleWithOffences.vehicleType=vehicle.vehicleType;
    })
    let offences=await Offence.find();

    offences.forEach(offence=>{
        let vanTotal=0;
        let carTotal=0;
        let bikeTotal=0;
        let lorryTotal=0;
        let threeWheelTotal=0;
        let busTotal=0;
        let containerTotal=0;
        vehicleNumberList.forEach(vehicleWithOffences=>{
            if(vehicleWithOffences.vehicleType=='Van'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        vanTotal++;          
                    }   
                })   
            }
            if(vehicleWithOffences.vehicleType=='Lorry'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        lorryTotal++;          
                    }   
                })   
            }
            if(vehicleWithOffences.vehicleType=='Bus'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        busTotal++;          
                    }   
                })   
            }
            if(vehicleWithOffences.vehicleType=='Bike'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        bikeTotal++;          
                    }   
                })   
            }
            if(vehicleWithOffences.vehicleType=='Car'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        carTotal++;          
                    }   
                })   
            }
            if(vehicleWithOffences.vehicleType=='Three Wheeler'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        threeWheelTotal++;          
                    }   
                })   
            }
            if(vehicleWithOffences.vehicleType=='Container'){
                vehicleWithOffences.offences.forEach(vehicleTypeOffence=>{
                    if(offence.provision==vehicleTypeOffence.provision){
                        containerTotal++;          
                    }   
                })   
            }
         
        })
            // console.log(offence.provision)
        let offenceToPush={
            sectionOfAct:offence._id,
            provision:offence.provision,
            vehicleTypes:[{
                name:'Car',
                total:carTotal
            },{
                name:'Van',
                total:vanTotal
            },{
                name:'Bus',
                total:busTotal
            },{
                name:'Lorry',
                total:lorryTotal
            },{
                name:'Container',
                total:containerTotal
            },{
                name:'Three Wheeler',
                total:threeWheelTotal
            },{
                name:'Bike',
                total:bikeTotal
            }  
            ]
        }
        vehicleTypeOffences.push(offenceToPush)
    })
    


    res.send(vehicleTypeOffences);
});


module.exports = router;  

