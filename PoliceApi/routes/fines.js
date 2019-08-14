const {Fine} = require('../models/fine');
const {Counter} = require('../models/counter');
const {PoliceStation} = require('../models/policeStation'); 
const {Policeman} =require('../models/policeman'); 
const {Offence} =require('../models/offence');
const {Driver} =require('../models/driverLicense');
const authPoliceStation =require('../middleware/policeStationAuth');
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
        if (!offence) return res.status(400).send('Invalid offence.');
        amount+=offence.amount;
        offences.push(offence);
    }
    
    let driver = await Driver.findOne({ _id : req.body.licenseNo});
    if (!((driver)||req.body.licenseNo=='No')) return res.status(400).send('Invalid driver license number.');

    let fineToCreate ;

    if(req.body.licenseNo=='No'){
        fineToCreate = new Fine({ 
            // _id:counter.value+1,
            _id:req.body.fineId,
            licenseNo:'No',
            driverName: 'No',
            driverAddress:'No',
            CatogeriesOfVehicles: 'No',
            vehicleNo:req.body.vehicleNo,
            offences:offences,
            time:req.body.time,
            amount:amount,
            fineStatus:req.body.fineStatus,
            place:req.body.place,
            date:new Date(req.body.date),
            paidDate:new Date(req.body.paidDate),
            validUntil:req.body.validUntil,
            policeStationName:policeStation.policeStationName,
            policeman:{
                _id:policeman._id,
                name:policeman.name,
                rank:policeman.rank.name
            },
            totalAmountPaid:req.body.totalAmountPaid,
            unpaidRecordedBy:req.body.unpaidRecordedBy,
            paidRecordedBy:req.body.paidRecordedBy
        });
    }
    else{
         fineToCreate = new Fine({ 
            // _id:counter.value+1,
            _id:req.body.fineId,
            licenseNo:driver._id,
            driverName: driver.Name,
            driverAddress: driver.Address,
            CatogeriesOfVehicles: driver.CatogeriesOfVehicles,
            vehicleNo:req.body.vehicleNo,
            offences:offences,
            time:req.body.time,
            amount:amount,
            fineStatus:req.body.fineStatus,
            place:req.body.place,
            date:new Date(req.body.date),
            paidDate:new Date(req.body.paidDate),
            validUntil:req.body.validUntil,
            policeStationName:policeStation.policeStationName,
            policeman:{
                _id:policeman._id,
                name:policeman.name,
                rank:policeman.rank.name
            },
            totalAmountPaid:req.body.totalAmountPaid,
            unpaidRecordedBy:req.body.unpaidRecordedBy,
            paidRecordedBy:req.body.paidRecordedBy
        });
    }
    // let counter=await Counter.findOneAndUpdate({ "name" : "itemId" },{ $inc: { "value" : 1 } });

    // let validUntil=req.body.date;
    // validUntil.setDate(validUntil.getDate()+28);

    // var dt = new Date("December 30, 2017 11:20:25");
    // dt.setDate( dt.getDate() - 10 );
  
    fineToCreate = await fineToCreate.save();

    res.send(fineToCreate);
});

router.get('/', async (req, res) => {
    let fine;
    let policeStationNameQuery=req.query.policeStationName;
    let policeManIdQuery=req.query.policeManId;
    let monthQuery=req.query.month;
    let yearQuery=req.query.year;
    let fineStatusQuery=true;
    if(req.query.fineStatus.localeCompare("true")){fineStatusQuery=false}

    async function getOfficerOneMonthFines(){
        let finesToReturn=[];
        let fines =await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            {$match:{'policeman._id':policeManIdQuery}},
            {$match:{fineStatus:fineStatusQuery}},
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
                    time:1,
                    offences:1,
                    amount:1,
                    unpaidRecordedBy:1,
                    place:1,
                    fineStatus:1,
                    policeStationName:1,
                    paidRecordedBy:1,
                    policeman:{name:1,_id:1,rank:1},
                    // date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    date:1,
                    paidDate:1,
                    dateDifference: { $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            },
            { $sort : { date : 1 } }
        ]);
        fines.forEach(fine=>{
            if(new Date(fine.date).getMonth()==parseInt(monthQuery)){
                if(new Date(fine.date).getFullYear()==parseInt(yearQuery)){
                    
                    finesToReturn.push(fine);
                }
            }
        })
     
        return finesToReturn;
        return fine;
    }

    async function getOfficerAllMonthsFines(){
        let fine =await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            {$match:{'policeman._id':policeManIdQuery}},
            {$match:{fineStatus:fineStatusQuery}},
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
                    unpaidRecordedBy:1,
                    amount:1,
                    time:1,
                    place:1,
                    paidRecordedBy:1,
                    fineStatus:1,
                    paidDate:1,
                    policeStationName:1,
                    policeman:{name:1,_id:1,rank:1},
                    // date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    date:1,
                    year:{$year:"$date"},
                    dateDifference: { $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            },
            {$match:{year:parseInt(yearQuery)}},
            { $sort : { date : 1 } }
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
                    time:1,
                    place:1,
                    offences:1,
                    amount:1,
                    fineStatus:1,
                    unpaidRecordedBy:1,
                    paidRecordedBy:1,
                    policeStationName:1,
                    policeman:{name:1,_id:1,rank:1},
                    year:{$year:"$date"},
                    month: { $month: "$date" },
                    dayOfMonth: { $dayOfMonth: "$date" },
                    hour: { $hour: "$date" },
                     minutes: { $minute: "$date" },
                    // date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    date:1,
                    paidDate:1,
                    dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            },
            {$match:{year:parseInt(yearQuery)}},
            { $sort : { date : -1 } },
        ]);
        return fine;
    }

    async function getAllOfficersOneMonthFines(){
        let finesToReturn=[];
        let fines=await Fine.aggregate([
            {$match:{policeStationName: policeStationNameQuery}},
            {$match:{fineStatus:fineStatusQuery}},
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
                    time:1,
                    place:1,
                    unpaidRecordedBy:1,
                    paidRecordedBy:1,
                    amount:1,
                    fineStatus:1,
                    policeStationName:1,
                    policeman:{name:1,_id:1,rank:1},
                    // date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    date:1,
                    paidDate:1,
                    dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
                }
            },
            { $sort : { date : 1 } }
        ]);

        
        fines.forEach(fine=>{
            if(new Date(fine.date).getMonth()==parseInt(monthQuery)){
                if(new Date(fine.date).getFullYear()==parseInt(yearQuery)){
                    
                    finesToReturn.push(fine);
                }
            }
        })
     
        return finesToReturn;
    }


    
    if(policeManIdQuery.localeCompare("")){
        if(monthQuery.localeCompare("")){
            fine=await getOfficerOneMonthFines();
        }else{
            fine=await getOfficerAllMonthsFines();
        }
       
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
    //  const ObjectId = mongoose.Types.ObjectId;
    //  let id= req.params.id;
     let fine=await Fine.aggregate([
        // {$match: { _id: parseInt(id) }},
        {$match:{_id:req.params.id}},
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
                time:1,
                recordedBy:1,
                place:1,
                fineStatus:1,
                policeStationName:1,
                policeman:{name:1,_id:1,rank:1},
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                dateDifference:{ $floor: {"$divide":[{$subtract: [ new Date(), "$date" ] }, 1000 * 60 * 60 * 24] } } 
            }
        },
    ]);
  
    if (fine.length==0) return res.status(404).send('fine was not found.');
  
    res.send(fine);
    
  });
router.put('/:id',async (req, res) => {
  const fine = await Fine.findByIdAndUpdate(req.params.id,
    { 
        fineStatus: req.body.fineStatus,
        amount: req.body.amount,
        additionalPay: req.body.additionalPay,
        totalAmountPaid: req.body.totalAmountPaid,
        paidRecordedBy:req.body.paidRecordedBy,
        paidDate:req.body.paidDate
    }, { new: true });

  if (!fine) return res.status(404).send('The offence with the given ID was not found.');
  res.send(fine);
  });

module.exports = router;  