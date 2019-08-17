const {CourtCase} = require('../models/courtCase');
const {Fine} = require('../models/fine');
const {PoliceStation} = require('../models/policeStation'); 
const Fawn = require("fawn");
const {Policeman} =require('../models/policeman'); 
const {Offence} =require('../models/offence');
const {Driver} =require('../models/driverLicense');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

Fawn.init(mongoose);

router.post('/', async (req, res) => {

    const policeman = await Policeman.findOne({_id: req.body.policemanId});
    if (!policeman) return res.status(400).send('Invalid Police Man.');

    const policeStation = await PoliceStation.findOne({  _id: policeman.policeStation}).populate('oicDivision');
    if (!policeStation) return res.status(400).send('Invalid Police Station.');
    
    
    let driver = await Driver.findOne({ _id : req.body.licenseNo});
    if (!((driver)||req.body.licenseNo=='No')) return res.status(400).send('Invalid driver license number.');
    console.log("dri");
    let offencesArrLength=req.body.offences.length;

    let offences=new Array();
    for(let i=0;i<offencesArrLength;i++){
        let offence=await Offence.findOne({_id:req.body.offences[i]});
        if (!offence) return res.status(400).send('Invalid offence.');
        offences.push(offence);
    }

    let courtCaseToCreate ;

    if(req.body.licenseNo=='No'){
        courtCaseToCreate = new CourtCase({ 
            // _id:counter.value+1,
            _id:req.body.courtId,
            licenseNo:'No',
            nic:req.body.nic,

            driverName: req.body.driverName,
            driverAddress: req.body.address,
            CatogeriesOfVehicles: 'No',

            vehicleNo:req.body.vehicleNo,
            offences:offences,
            time:req.body.time,
            place:req.body.place,
            date:new Date(req.body.date),

            amount:req.body.amount,
            status:req.body.status,
            courtName:policeStation.oicDivision.oicDivisionName,
            courtHearingDate:req.body.courtHearingDate,
            courtHearingTime:req.body.courtHearingTime,
            paidDate:new Date(req.body.paidDate),
        
            policeStationName:policeStation.policeStationName,
            policeman:{
                _id:policeman._id,
                name:policeman.name,
                rank:policeman.rank.name
            },


            unpaidRecordedBy:req.body.unpaidRecordedBy,
            courtRecordedBy:req.body.courtRecordedBy,
            courtPaidRecordedBy:req.body.courtPaidRecordedBy,

        });
    }
    else{
        courtCaseToCreate = new CourtCase({ 
            
            _id:req.body.courtId,
            licenseNo:driver._id,
            nic:req.body.nic,

           
            driverName: req.body.driverName,
            driverAddress:req.body.address,
            CatogeriesOfVehicles: driver.CatogeriesOfVehicles,
           
            vehicleNo:req.body.vehicleNo,
            offences:offences,
            time:req.body.time,
            place:req.body.place,
            date:new Date(req.body.date),

            amount:req.body.amount,
            status:req.body.status,
            courtName:policeStation.oicDivision.oicDivisionName,
            courtHearingDate:req.body.courtHearingDate,
            courtHearingTime:req.body.courtHearingTime,
            paidDate:new Date(req.body.paidDate),
        
            policeStationName:policeStation.policeStationName,
            policeman:{
                _id:policeman._id,
                name:policeman.name,
                rank:policeman.rank.name
            },

            unpaidRecordedBy:req.body.unpaidRecordedBy,
            courtRecordedBy:req.body.courtRecordedBy,
            courtPaidRecordedBy:req.body.courtPaidRecordedBy,

        });
    }

    courtCaseToCreate=await courtCaseToCreate.save();
    res.send(courtCaseToCreate);
   
});


router.post('/updateUnpaidToCourtCase/', async (req, res) => {

    const fineId=req.body._id;
    console.log(req.body.policeStationName);
    const policeStation = await PoliceStation.findOne({policeStationName: req.body.policeStationName}).populate('oicDivision');
    if (!policeStation) return res.status(400).send('Invalid Police Station.');
    console.log(fineId);
    
    let driver = await Driver.findOne({ _id : req.body.licenseNo});
    if (!((driver)||req.body.licenseNo=='No')) return res.status(400).send('Invalid driver license number.');
    console.log("dri");
    let courtCaseToCreate ;

    if(req.body.licenseNo=='No'){
        courtCaseToCreate = new CourtCase({ 
            // _id:counter.value+1,
            _id:req.body.courtId,
            licenseNo:'No',
            nic:req.body.nic,

            driverName: req.body.driverName,
            driverAddress: req.body.address,
            CatogeriesOfVehicles: 'No',

            vehicleNo:req.body.vehicleNo,
            offences:req.body.offences,
            time:req.body.time,
            place:req.body.place,
            date:new Date(req.body.date),

            amount:req.body.amount,
            status:req.body.status,
            courtName:policeStation.oicDivision.oicDivisionName,
            courtHearingDate:req.body.courtHearingDate,
            courtHearingTime:req.body.courtHearingTime,
            paidDate:new Date(req.body.paidDate),
        
            policeStationName:policeStation.policeStationName,
            policeman:req.body.policeman,

            unpaidRecordedBy:req.body.unpaidRecordedBy,
            courtRecordedBy:req.body.courtRecordedBy,
            courtPaidRecordedBy:req.body.courtPaidRecordedBy,

        });
    }
    else{
        courtCaseToCreate = new CourtCase({ 
            // _id:counter.value+1,
            _id:req.body.courtId,
            licenseNo:driver._id,
            nic:req.body.nic,

           
            driverName: driver.Name,
            driverAddress:req.body.address,
            CatogeriesOfVehicles: driver.CatogeriesOfVehicles,
           
            vehicleNo:req.body.vehicleNo,
            offences:req.body.offences,
            time:req.body.time,
            place:req.body.place,
            date:new Date(req.body.date),

            amount:req.body.amount,
            status:req.body.status,
            courtName:policeStation.oicDivision.oicDivisionName,
            courtHearingDate:req.body.courtHearingDate,
            courtHearingTime:req.body.courtHearingTime,
            paidDate:new Date(req.body.paidDate),
        
            policeStationName:policeStation.policeStationName,
            policeman:req.body.policeman,

            unpaidRecordedBy:req.body.unpaidRecordedBy,
            courtRecordedBy:req.body.courtRecordedBy,
            courtPaidRecordedBy:req.body.courtPaidRecordedBy,

        });
    }

    try{
        let task=new Fawn.Task()
        .save('courtcases',courtCaseToCreate)
        .run();
        const unpaidFine = await Fine.findOne({_id: fineId});

        // task.remove('fines',{_id:unpaidFine._id})
            // .run();
        
         res.send(courtCaseToCreate);
    }catch(ex){
        console.log(ex);
        res.status(500).send('Some error.');
    }
   
});


router.get('/policeStation/allmonths/unpaidCourt', async (req, res) => {
    let courtCasesToSent=[];
    let policeStationQuery=req.query.policeStationName;
    let yearQuery=req.query.year;
    
    const courtCases = await CourtCase.find({status:false,policeStationName:policeStationQuery})

    courtCases.forEach(courtCase=>{
      if(new Date(courtCase.date).getFullYear()==parseInt(yearQuery)){       
            courtCasesToSent.push(courtCase);
      }
    })
    res.send(courtCasesToSent);
});

router.get('/policeStation/selectedMonth/unpaidCourt', async (req, res) => {
    let courtCasesToSent=[];
    let policeStationQuery=req.query.policeStationName;
    let yearQuery=req.query.year;
    let monthQuery=req.query.month;
    const courtCases = await CourtCase.find({status:false,policeStationName:policeStationQuery})

    courtCases.forEach(courtCase=>{
        if(new Date(courtCase.date).getMonth()==parseInt(monthQuery)){
            if(new Date(courtCase.date).getFullYear()==parseInt(yearQuery)){
                    
                courtCasesToSent.push(courtCase);
            }  
        }
    })
    res.send(courtCasesToSent);
});




router.get('/policeStation/allmonths/paidCourt', async (req, res) => {
    let courtCasesToSent=[];
    let policeStationQuery=req.query.policeStationName;
    let yearQuery=req.query.year;
    
    const courtCases = await CourtCase.find({status:true,policeStationName:policeStationQuery})

    courtCases.forEach(courtCase=>{
      if(new Date(courtCase.date).getFullYear()==parseInt(yearQuery)){       
            courtCasesToSent.push(courtCase);
      }
    })
    res.send(courtCasesToSent);
});

router.get('/policeStation/selectedMonth/paidCourt', async (req, res) => {
    let courtCasesToSent=[];
    let policeStationQuery=req.query.policeStationName;
    let yearQuery=req.query.year;
    let monthQuery=req.query.month;
    const courtCases = await CourtCase.find({status:true,policeStationName:policeStationQuery})

    courtCases.forEach(courtCase=>{
        if(new Date(courtCase.date).getMonth()==parseInt(monthQuery)){
            if(new Date(courtCase.date).getFullYear()==parseInt(yearQuery)){
                    
                courtCasesToSent.push(courtCase);
            }  
        }
    })
    res.send(courtCasesToSent);
});



router.put('/CourtDate/:id',async (req, res) => {
    const courtCase = await CourtCase.findByIdAndUpdate(req.params.id,
      { 
        courtHearingDate:req.body.courtHearingDate,
        courtHearingTime:req.body.courtHearingTime,
      }, { new: true });
  
    if (!courtCase) return res.status(404).send('The Court Case with the given ID was not found.');
    res.send(courtCase);
    });

router.put('/SettleCourtCase/:id',async (req, res) => {
    const courtCase = await CourtCase.findByIdAndUpdate(req.params.id,
        { 
            status:true,
            amount:req.body.amount,
            courtPaidRecordedBy:req.body.courtPaidRecordedBy,
            paidDate:req.body.paidDate
          }, { new: true });
      
        if (!courtCase) return res.status(404).send('The Court Case with the given ID was not found.');
        res.send(courtCase);
});



// router.post('/check', async (req, res) => {  
//     let EndTime=new Date(req.body.EndTime).getTime();
//     let StartTime=new Date(req.body.StartTime).getTime();
//     let vehicleType=req.body.vehicleType;

//     let reservationDetailsToSend={
//         availablity:true,
//         vehicles:[]
//     };

//     const vehicles=await Vehicles.find({VehicleType:vehicleType});
//     const reservations = await Reservations.find().populate('Vehicle');
//     let noOfVehiclesInType=vehicles.length;
//     let x=0;

//     reservations.forEach(reservation=>{
//         if(reservation.Vehicle.VehicleType==vehicleType){
//             let reservationStartTime=reservation.StartTime.getTime();
//             let reservationEndTime=reservation.EndTime.getTime();
//             if(reservationStartTime==StartTime){
//                 x++;
//                 reservationDetailsToSend.vehicles.push(reservation.Vehicle);
//             }
//             else if(reservationStartTime<StartTime&&reservationEndTime>StartTime){
//                 x++;
//                 reservationDetailsToSend.vehicles.push(reservation.Vehicle);
//             }
//             else if(reservationStartTime>StartTime&&reservationStartTime<EndTime){
//                 x++;
//                 reservationDetailsToSend.vehicles.push(reservation.Vehicle);
//             }
//         }     
//     })
//     if(x>=noOfVehiclesInType){reservationDetailsToSend.availablity=false}
//     res.send(reservationDetailsToSend);
// });


module.exports = router; 