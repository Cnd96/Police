const {Fine} = require('../models/fine'); 
const {Offence} =require('../models/offence');
const request=require('request');
const express = require('express');
const router = express.Router();

  
router.get('/allPoliceStation', async (req, res) => {

    let yearQuery=req.query.year;
    let finesDataToSend=[
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
    //finding all fines in one month
    let finesGroupByMonth =await Fine.aggregate([
        {
            $project:{
                month: { $month: "$date" },
                year:{$year:"$date"},
                date:1
            }
        },
        {$match:{year:parseInt(yearQuery)}},
        {
            $group : {
               _id : { month: { $month: "$date" } },
               count: { $sum: 1 }
            }
        },
    ]);

    finesGroupByMonth.forEach(fine=>{
        finesDataToSend.forEach(data=>{
            if(data.id==fine._id.month){
                data.count=fine.count;
                
            }
        })
    })
    
    res.send(finesDataToSend);
});




module.exports = router;  

