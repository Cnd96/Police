const {Fine} = require('../models/fine'); 
const {Offence} =require('../models/offence');
const request=require('request');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
        let monthQuery=req.query.month;
        let yearQuery=req.query.year;
  
        //finding all fines in one month
        let fines =await Fine.aggregate([
            {
                $project:{
                    offences:1,
                    month: { $month: "$date" },
                    year:{$year:"$date"},
                }
            },
            {$match:{year:parseInt(yearQuery)}},
            {$match:{month:parseInt(monthQuery)}},
            { $sort : { date : 1 } }
        ]);

        let offenceList=[];//offence ist to send
        let offences=await Offence.find();


        //Iterating through offences
        offences.forEach(offence=>{
            let total=0;
            //Iterating through monthly fines
            fines.forEach(fine=>{
                //Iterating through offences of monthly fines to get the total 
                fine.offences.forEach(fineOffence=>{
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

    //finding all fines in one month
    let fines =await Fine.aggregate([
        {
            $project:{
                offences:1,
                month: { $month: "$date" },
                year:{$year:"$date"},
            }
        },
        { $sort : { date : 1 } }
    ]);

    let offenceList=[];//offence list to send
    let offences=await Offence.find();


    //Iterating through offences
    offences.forEach(offence=>{
        let total=0;
        //Iterating through monthly fines
        fines.forEach(fine=>{
            //Iterating through offences of monthly fines to get the total 
            fine.offences.forEach(fineOffence=>{
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

