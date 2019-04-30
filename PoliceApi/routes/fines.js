const {Fine} = require('../models/fine');
const {Counter} = require('../models/counter');
const {PoliceStation} = require('../models/policeStation'); 
const {Policeman} =require('../models/policeman'); 
const {Offence} =require('../models/offence');
const {Driver} =require('../models/driverLicense');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    const policeman = await Policeman.findOne({_id: req.body.policemanId});
    if (!policeman) return res.status(400).send('Invalid Police Man.');

    const policeStation = await PoliceStation.findOne({  _id: policeman.policeStation});
    if (!policeStation) return res.status(400).send('Invalid Police Station.');
    
    let offencesArrLength=req.body.offences.length;
    let offences=new Array();
    let amount=0;
    for(let i=0;i<offencesArrLength;i++){
        let offence=await Offence.findOne({_id:req.body.offences[i]});
        amount+=offence.amount;
        offences.push(offence);
    }
    
    const driver = await Driver.findOne({ _id : req.body.licenseNo});
    if (!driver) return res.status(400).send('Invalid driver license number.');

    let counter=await Counter.findOneAndUpdate({ "name" : "fineId" },{ $inc: { "value" : 1 } });

    let fineToCreate = new Fine({ 
        _id:counter.value+1,
        licenseNo:driver._id,
        driverName: driver.Name,
        driverAddress: driver.Address,
        CatogeriesOfVehicles: driver.CatogeriesOfVehicles,
        vehicleNo:req.body.vehicleNo,
        offences:offences,
        time:new Date().toLocaleTimeString(),
        amount:amount,
        fineStatus:req.body.fineStatus,
        policeStationName:policeStation.policeStationName,
        policeman:{
            _id:policeman._id,
            name:policeman.name,
            rank:policeman.rank.name
        },
        date:req.body.date
    });
    fineToCreate = await fineToCreate.save();

    res.send(fineToCreate);
  });

router.get('/', async (req, res) => {
    let fine;
    let policeStationNameQuery=req.query.policeStationName;
    let policeManIdQuery=req.query.policeManId;
    let monthQuery=req.query.month;
    let fineStatusQuery=true;
    if(req.query.fineStatus.localeCompare("true")){fineStatusQuery=false}

    async function getOfficerAllMonthsFines(){
        let fine =await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            {$match:{fineStatus:fineStatusQuery}},
            {$match:{'policeman._id':policeManIdQuery}},
            {
                $project:{
                    licenseNo:1,
                    amount:1,
                    driverName: 1,
                    driverAddress: 1,
                    CatogeriesOfVehicles: 1,
                    additionalPay:1,
                    totalAmountPaid:1,
                    vehicleNo:1,
                    offences:1,
                    amount:1,
                    fineStatus:1,
                    policeStationName:1,
                    policeman:{name:1,_id:1,rank:1},
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    dateDifference: { $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            }
        ]);
        return fine;
    }
   
    async function getAllOfficersAllMonthsFines(){
        let fine=await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            {$match:{fineStatus:fineStatusQuery}},
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
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            }
        ]);
        return fine;
    }

    async function getAllOfficersOneMonthFines(){
        let fine=await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            {$match:{fineStatus:fineStatusQuery}},
            {$match:{}},
            {
                $project:{
                    licenseNo:1,
                    amount:1,
                    driverName: 1,
                    driverAddress: 1,
                    CatogeriesOfVehicles: 1,
                    additionalPay:1,
                    totalAmountPaid:1,
                    vehicleNo:1,
                    offences:1,
                    amount:1,
                    fineStatus:1,
                    policeStationName:1,
                    policeman:{name:1,_id:1,rank:1},
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    month: { $month: "$date" },
                    dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            },
            {$match:{month:parseInt(monthQuery)}}
        ]);
        return fine;
    }


    if(policeManIdQuery.localeCompare("")){
        fine=await getOfficerAllMonthsFines();
        // fine = await Fine.find({policeStationName:policeStationNameQuery, 'policeman._id':policeManIdQuery,fineStatus:fineStatusQuery});
    }
    else{

        if(monthQuery.localeCompare("")){
            fine =await getAllOfficersOneMonthFines();
        }else{
            fine =await getAllOfficersAllMonthsFines();
        }
        // fine = await Fine.find({policeStationName:policeStationNameQuery,fineStatus:fineStatusQuery});
    }
    
    res.send(fine);
  });

  

  
router.get('/:id', async (req, res) => {
     const ObjectId = mongoose.Types.ObjectId;
     let id= req.params.id;
     let fine=await Fine.aggregate([
        {$match: { _id: ObjectId(id) }},
        {
            $project:{
                licenseNo:1,
                amount:1,
                driverName: 1,
                driverAddress: 1,
                CatogeriesOfVehicles: 1,
                additionalPay:1,
                totalAmountPaid:1,
                vehicleNo:1,
                offences:1,
                amount:1,
                fineStatus:1,
                policeStationName:1,
                policeman:{name:1,_id:1,rank:1},
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
            }
        },
    ]);
  
    if (!fine) return res.status(404).send('Offence was not found.');
  
    res.send(fine);
    
  });
// router.put('/:id',async (req, res) => {
//   const offence = await Offence.findByIdAndUpdate(req.params.id,
//     { 
//       provision: req.body.provision,
//       amount: req.body.amount
//     }, { new: true });

//   if (!offence) return res.status(404).send('The offence with the given ID was not found.');
//   res.send(offence);
//   });

module.exports = router;  


