const {Rank} = require('../models/rank');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    
    let rankToCreate = new Rank({ 
         _id: req.body._id,
        name: req.body.name,
    });
    rankToCreate = await rankToCreate.save();
    
    res.send(rankToCreate);
  });

router.get('/', async (req, res) => {
    const rank = await Rank.find();
    res.send(rank);
  });

module.exports = router;  







// let fine=await Fine.aggregate([
//   {$match:{policeStationName: policeStationNameQuery}},
//   // {$match:{fineStatus:fineStatusQuery}},
//   {
//       $project:{
//           licenseNo:1,
//           amount:1,
//           driverName: 1,
//           driverAddress: 1,
//           CatogeriesOfVehicles: 1,
//           vehicleNo:1,
//           additionalPay:1,
//           totalAmountPaid:1,
//           offences:1,
//           amount:1,
//           fineStatus:1,
//           policeStationName:1,
//           policeman:{name:1,_id:1,rank:1},
//           year:{$year:"$date"},
//           date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//           dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
//       }
//   },
//   { $sort : { date : 1 } },
//   { $skip : (pageNumber-1)*pageSize},
//   { $limit : pageSize }
// ]);
