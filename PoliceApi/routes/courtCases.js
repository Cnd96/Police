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

router.post('/updateUnpaidToCourtCase/', async (req, res) => {

    const fineId=req.body._id;
    console.log(req.body.policeStationName);
    const policeStation = await PoliceStation.findOne({policeStationName: req.body.policeStationName}).populate('oicDivision');
    if (!policeStation) return res.status(400).send('Invalid Police Station.');
    console.log(fineId);
    // let offencesArrLength=req.body.offences.length;
    // let offences=new Array();
    // // let amount=0;
    // for(let i=0;i<offencesArrLength;i++){
    //     let offence=await Offence.findOne({_id:req.body.offences[i]});
    //     if (!offence) return res.status(400).send('Invalid offence.');
    //     // amount+=offence.amount;
    //     offences.push(offence);
    // }
    
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
            driverAddress: req.body.driverAddress,
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
            driverAddress:req.body.driverAddress,
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
        .save('courtcases',courtCaseToCreate);

        const unpaidFine = await Fine.findOne({_id: '455'});

        task.remove('fines',{_id:unpaidFine._id})
            .run();
        
         res.send(courtCaseToCreate);
    }catch(ex){
        console.log(ex);
        res.status(500).send('Some error.');
    }
   
});



module.exports = router;  