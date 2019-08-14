const {Fine} = require('../models/fine'); 
const {CourtCase} = require('../models//courtCase'); 
const {Offence} =require('../models/offence');
const request=require('request');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
        let monthQuery=req.query.month;
        let yearQuery=req.query.year;
  
        let finesListOfSelectedMonth=[];
        let courtListOfSelectedMonth=[];
        let allCasesOfSelectedMonth=[];
        //finding all fines in one month
        let fines =await Fine.aggregate([
            {
                $project:{
                    offences:1,
                    date:1
                }
            },
        ]);

        let courtCases =await CourtCase.aggregate([
            {
                $project:{
                    offences:1,
                    date:1
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

        allCasesOfSelectedMonth=courtListOfSelectedMonth.concat(finesListOfSelectedMonth);
        let offenceList=[];//offence ist to send
        let offences=await Offence.find();


        //Iterating through offences
        offences.forEach(offence=>{
            let total=0;
            //Iterating through monthly fines
            allCasesOfSelectedMonth.forEach(cases=>{
                //Iterating through offences of monthly fines to get the total 
                cases.offences.forEach(fineOffence=>{
                    if(fineOffence.provision==offence.provision){
                        total++;
                        // console.log(total)
                    }   
                })   
            })
            // console.log(offence.provision)
            let offenceToPush={
                sectionOfAct:offence._id,
                provision:offence.provision,
                total:total
            }
            offenceList.push(offenceToPush)
        })

        // let data={
        //     template:{'shortid': 'SyeaS4TlQr'},
        //     data:{
        //         "month": "March",
        //         "year": "2019",
        //         "offences": offenceList
        //     },
        //     options:{
        //         preview:true
        //     }
        // }
        // var options={
        //     url:'http://localhost:5488/api/report',
        //     method:'POST',
        //     json:data
        // }
        // request(options).pipe(res);
    res.send(offenceList);
  });

  
router.get('/all', async (req, res) => {

    let allCases=[];
    let fines =await Fine.aggregate([
        {
            $project:{
                offences:1,
            }
        },
        { $sort : { date : 1 } }
    ]);

    let courtCases =await CourtCase.aggregate([
        {
            $project:{
                offences:1,
            }
        },
    ]);

    allCases=courtCases.concat(fines);
    let offenceList=[];//offence list to send
    let offences=await Offence.find();


    //Iterating through offences
    offences.forEach(offence=>{
        let total=0;
        //Iterating through fines
        allCases.forEach(eachCase=>{
            //Iterating through offences of fines to get the total 
            eachCase.offences.forEach(fineOffence=>{
                if(fineOffence.provision==offence.provision){
                    total++;
                    // console.log(total)
                }   
            })   
        })
        // console.log(offence.provision)
        let offenceToPush={
            sectionOfAct:offence._id,
            provision:offence.provision,
            total:total
        }
        offenceList.push(offenceToPush)
    })
res.send(offenceList);
});




module.exports = router;  

