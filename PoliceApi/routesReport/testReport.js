const {Fine} = require('../models/fine');
const {Counter} = require('../models/counter');
const {PoliceStation} = require('../models/policeStation'); 
const {Policeman} =require('../models/policeman'); 
const {Offence} =require('../models/offence');
const {Driver} =require('../models/driverLicense');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  
    let policeStationNameQuery=req.query.policeStationName;
    // let policeManIdQuery=req.query.policeManId;
    let pageNumber=parseInt(req.query.pageNumber);
    let pageSize=2;
    let monthQuery=req.query.month;
    let yearQuery=req.query.year;
    let fineStatusQuery=true;
    // if(req.query.fineStatus.localeCompare("true")){fineStatusQuery=false}

   
 
        let fine=await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            // {$match:{fineStatus:fineStatusQuery}},
            {
                $project:{
                    licenseNo:1,
                    amount:1,
                    driverName: 1,
                    driverAddress: 1,
                    CatogeriesOfVehicles: 1,
                    vehicleNo:1,
                    additionalPay:1,
                    totalAmountPaid:1,
                    offences:1,
                    amount:1,
                    fineStatus:1,
                    policeStationName:1,
                    policeman:{name:1,_id:1,rank:1},
                    year:{$year:"$date"},
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            },
            { $sort : { date : 1 } },
            { $skip : (pageNumber-1)*pageSize},
            { $limit : pageSize }
        ]);
       

    
    
    res.send(fine);
  });

  


module.exports = router;  


