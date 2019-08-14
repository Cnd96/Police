const {Fine} = require('../models/fine'); 
const {CourtCase} =require('../models/courtCase');
const request=require('request');
const express = require('express');
const router = express.Router();

  
router.get('/allPoliceStation', async (req, res) => {

    let yearQuery=req.query.year;
    let finesAndCasesDataToSend=[
        { month:'jan', count: 0,id:1 }, 
        { month: 'feb', count: 0,id:2},
        { month:'mar', count: 0 ,id:3}, 
        { month: 'apr', count: 0 ,id:4},
        { month: 'may', count: 0 ,id:5},
        { month:'jun', count: 0 ,id:6},
        { month:'jul', count: 0 ,id:7}, 
        { month: 'aug', count: 0,id:8},
        { month:'sep', count: 0 ,id:9}, 
        { month: 'oct', count: 0 ,id:10},
        { month:'nov', count: 0,id:11},
        { month:'dec', count: 0,id:12}
    ]

    let finesAndCourtsOfSelectedYear=[];
    let allDates=[];
    //finding dates all fines
    let fineDates=await Fine.aggregate([
        {
            $project:{
                date:1                
            }
        },
    ]);
    //finding dates all courtCases
    let courtDates=await CourtCase.aggregate([
        {
            $project:{
                date:1                
            }
        },
    ]);

    //combine fine dates and court case dates
    allDates=fineDates.concat(courtDates);

    allDates.forEach(fine=>{
        if(new Date(fine.date).getFullYear()==parseInt(yearQuery)){
            // console.log(fine.date.getMonth()+1)
            finesAndCourtsOfSelectedYear.push(fine); 
         }
    })

 
    finesAndCourtsOfSelectedYear.forEach(fineAndCase=>{

        finesAndCasesDataToSend.forEach(data=>{
            if(data.id==(fineAndCase.date.getMonth()+1)){
                data.count++;  
                return;        
            }
        })
    })
    res.send(finesAndCasesDataToSend);
});




module.exports = router;  

