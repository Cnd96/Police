const {Fine} = require('../models/fine');
const {CourtCase} = require('../models/courtCase');
const {Counter} = require('../models/counter');
const {PoliceStation} = require('../models/policeStation'); 
const {Policeman} =require('../models/policeman'); 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/getMonthlyTargets', async (req, res) => {
    let monthQuery=req.query.month;
    let yearQuery=req.query.year;
    let policeStationNameQuery=req.query.policeStationName;
    let policeStationQuery=req.query.policeStationId;

    let finesListOfSelectedMonth=[];
    let courtListOfSelectedMonth=[];
    let allCasesOfSelectedMonth=[];
    //finding all fines in one month
    let fines =await Fine.aggregate([
        {$match:{policeStationName:policeStationNameQuery}},
        {
            $project:{
                offences:1,
                date:1,
                policeStationName:1,
                policeman:1
            }
        },
        
    ]);

    let courtCases =await CourtCase.aggregate([
        {$match:{policeStationName:policeStationNameQuery}},
        {
            $project:{
                offences:1,
                date:1,
                policeStationName:1,
                policeman:1
            }
        },
    ]);

    courtCases.forEach(courtCase=>{
        if(new Date(courtCase.date).getMonth()==parseInt(monthQuery)){
            if(new Date(courtCase.date).getFullYear()==parseInt(yearQuery)){
                    
                courtListOfSelectedMonth.push(courtCase);
            }  
        }
    })
    fines.forEach(fine=>{
        if(new Date(fine.date).getMonth()==parseInt(monthQuery)){
            if(new Date(fine.date).getFullYear()==parseInt(yearQuery)){
                    
                finesListOfSelectedMonth.push(fine);
            }  
        }
    })

    const policemen = await Policeman
    .find({policeStation:policeStationQuery})
    .select("-password")
    .sort('rank._id');

    allCasesOfSelectedMonth=courtListOfSelectedMonth.concat(finesListOfSelectedMonth);

    policemenToSend=[];

    policemen.forEach(policeman=>{
        let policemanToPush={
            name:policeman.name,
            _id:policeman._id,
            rank:policeman.rank.name,
            fines:0,
            courtCases:0
        }
        finesListOfSelectedMonth.forEach(fine=>{
            if(fine.policeman._id==policeman._id){
                policemanToPush.fines++;
            }
        })
        courtListOfSelectedMonth.forEach(courtCase=>{
            if(courtCase.policeman._id==policeman._id){
                policemanToPush.courtCases++;
            }
        })
        policemenToSend.push(policemanToPush)
    })
    
    
    res.send(policemenToSend);
  });


module.exports = router;  


