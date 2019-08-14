const {Fine} = require('../models/fine'); 
const {CourtCase} = require('../models/courtCase'); 
const {PoliceStation} = require('../models/policeStation'); 
const express = require('express');
const router = express.Router();

router.get('/income', async (req, res) => {
        let monthQuery=req.query.month;
        let yearQuery=req.query.year;
        let paidFinesOfSelectedMonth=[];
        let paidCourtCasesOFMonth=[];

        //finding all paid fines in all months
        let fines =await Fine.aggregate([
            {$match:{fineStatus:true}},
            {
                $project:{
                    totalAmountPaid:1,
                    policeStationName:1,
                    paidDate:1
                }
            },
            { $sort : { date : 1 } }
        ]);
        //finding all paid fines in selected month
        fines.forEach(fine=>{
            if(new Date(fine.paidDate).getMonth()==parseInt(monthQuery)){
                if(new Date(fine.paidDate).getFullYear()==parseInt(yearQuery)){
                        
                    paidFinesOfSelectedMonth.push(fine);
                }  
            }
        })
        //finding all paid courtcases in all months
        let courtCases =await CourtCase.aggregate([
            {$match:{status:true}},
            {
                $project:{
                    amount:1,
                    policeStationName:1,
                    paidDate:1
                }
            },
            { $sort : { date : 1 } }
        ]);
        //finding all paid court in selected month
        courtCases.forEach(courtCases=>{
            if(new Date(courtCases.paidDate).getMonth()==parseInt(monthQuery)){
                if(new Date(courtCases.paidDate).getFullYear()==parseInt(yearQuery)){
                        
                    paidCourtCasesOFMonth.push(courtCases);
                }  
            }
        })

        let policeStationList=[];
        let policeStations=await PoliceStation.find().populate('oicDivision').sort({ oicDivision:1 } );


        policeStations.forEach(policeStation=>{
            let courtCaseIncome=0;
            let fineIncome=0;
            paidFinesOfSelectedMonth.forEach(fine=>{
                    if(fine.policeStationName==policeStation.policeStationName){
                        fineIncome+=fine.totalAmountPaid;
                        console.log(fine._id)
                    }   
            })
            paidCourtCasesOFMonth.forEach(courtCase=>{
                if(courtCase.policeStationName==policeStation.policeStationName){
                    courtCaseIncome+=courtCase.amount;
                    // console.log(total)
                } 
            })
            let policestationToPush={
                policeStationName:policeStation.policeStationName,
                phoneNo:policeStation.phoneNo,
                fineIncome:fineIncome,
                courtCaseIncome:courtCaseIncome,
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

