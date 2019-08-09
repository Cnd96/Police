const {Fine} = require('../models/fine'); 
const {PoliceStation} = require('../models/policeStation'); 
const express = require('express');
const router = express.Router();

router.get('/income', async (req, res) => {
        let monthQuery=req.query.month;
        let yearQuery=req.query.year;
  
        //finding all fines in one month
        let fines =await Fine.aggregate([
            {
                $project:{
                    offences:1,
                    totalAmountPaid:1,
                    policeStationName:1,
                    month: { $month: "$date" },
                    year:{$year:"$date"},
                }
            },
            {$match:{year:parseInt(yearQuery)}},
            {$match:{month:parseInt(monthQuery)}},
            { $sort : { date : 1 } }
        ]);

        let policeStationList=[];
        let policeStations=await PoliceStation.find().populate('oicDivision').sort({ oicDivision:1 } );


        policeStations.forEach(policeStation=>{
            let total=0;
            fines.forEach(fine=>{
                    if(fine.policeStationName==policeStation.policeStationName){
                        total+=fine.totalAmountPaid;
                        // console.log(total)
                    }   
            })
            let policestationToPush={
                policeStationName:policeStation.policeStationName,
                phoneNo:policeStation.phoneNo,
                total:total,
                oicDivision:policeStation.oicDivision.oicDivisionName
            }
            policeStationList.push(policestationToPush)
        })

    
    res.send(policeStationList);
  });

  
router.get('/income/all', async (req, res) => {

     let fines =await Fine.aggregate([
        {
            $project:{
                offences:1,
                totalAmountPaid:1,
                policeStationName:1,
                month: { $month: "$date" },
                year:{$year:"$date"},
            }
        },
        { $sort : { date : 1 } }
    ]);

    let policeStationList=[];
    let policeStations=await PoliceStation.find().populate('oicDivision').sort({ oicDivision:1 } );


    policeStations.forEach(policeStation=>{
        let total=0;
        fines.forEach(fine=>{
                if(fine.policeStationName==policeStation.policeStationName){
                    total+=fine.totalAmountPaid;
                    // console.log(total)
                }   
        })
        let policestationToPush={
            policeStationName:policeStation.policeStationName,
            phoneNo:policeStation.phoneNo,
            total:total,
            oicDivision:policeStation.oicDivision.oicDivisionName
        }
        policeStationList.push(policestationToPush)
    })


res.send(policeStationList);
});




module.exports = router;  

