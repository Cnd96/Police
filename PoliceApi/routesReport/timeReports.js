const {Fine} = require('../models/fine');
const {CourtCase} = require('../models/courtCase');
const {Offence} = require('../models/offence');
const {PoliceStation} = require('../models/policeStation'); 
const {Policeman} =require('../models/policeman'); 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/getOffencesByTime', async (req, res) => {
    let times=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23' ];
    let dataToSend=[];
    let monthQuery=req.query.month;
    let yearQuery=req.query.year;
    let policeStationNameQuery=req.query.policeStationName;

    let finesListOfSelectedMonth=[];
    let courtListOfSelectedMonth=[];
    let allCasesOfSelectedMonth=[];

    let fines =await Fine.aggregate([
        {$match:{policeStationName:policeStationNameQuery}},
        {
            $project:{
                offences:1,
                date:1,
                policeStationName:1,
                time:1
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
                policeman:1,
                time:1
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
    let offences=await Offence.find();
    allCasesOfSelectedMonth=courtListOfSelectedMonth.concat(finesListOfSelectedMonth);

    // times.forEach(time=>{
    //     let timeUpperLimitNumber = parseInt(time)+1;
    //     let formattedTimeUpperLimit = ("0" + timeUpperLimitNumber).slice(-2);
        
    //      //yime data template
    //      let timeData={
    //         time:time+"hrs-"+formattedTimeUpperLimit+"hrs",
    //         offencesData:[]
    //     }

        
        // let timeOffences=[];
        // //iterating through all cases
        // allCasesOfSelectedMonth.forEach(eachCase=>{
        //     //matching places in all cases and client request
        //     if(eachCase.time.startsWith(time)){
        //         // pushing eachcase offences to place offences
        //         eachCase.offences.forEach(offence=>{
        //             timeOffences.push(offence);
        //         })
        //     }
        // })
    //     // console.log()

    //     offences.forEach(offence=>{
    //         let total=0;
    //         //Iterating through place all offences
    //         timeOffences.forEach(timeOffence=>{

    //             if(timeOffence.provision==offence.provision){
    //                 total++;
    //             }   
     
    //         })
    //         // console.log(offence.provision)
    //         let offenceToPush={
    //             sectionOfAct:offence._id,
    //             provision:offence.provision,
    //             total:total
    //         }
    //         timeData.offencesData.push(offenceToPush)
    //     })

    //     dataToSend.push(timeData);
    // })

    offences.forEach(offence=>{
        let timeData=[];
        times.forEach(time=>{
           
            let total=0;
            allCasesOfSelectedMonth.forEach(eachCase=>{
                //matching places in all cases and client request

                eachCase.offences.forEach(eachOffence=>{
                    if(offence.provision==eachOffence.provision){
                        if(eachCase.time.startsWith(time)){
                            console.log(eachCase)
                            total++;
                        }
                    }
                })
                
                
            })
            let timeUpperLimitNumber = parseInt(time)+1;
            let formattedTimeUpperLimit = ("0" + timeUpperLimitNumber).slice(-2);
            let timeDataToPush={
                time:time+"hrs-"+formattedTimeUpperLimit+"hrs",
                total:total
            }
            timeData.push(timeDataToPush);
        })
        //Iterating through place all offences
       
        // console.log(offence.provision)
        let offenceToPush={
            sectionOfAct:offence._id,
            provision:offence.provision,
            timeData:timeData
        }
        dataToSend.push(offenceToPush)
    })
   
   
    res.send(dataToSend);
  });


module.exports = router;  


