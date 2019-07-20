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
  
        let fines= await Fine.find();
        let offenceList=[];
        let offences=await Offence.find();

        

        offences.forEach(offence=>{
            let total=0;
            fines.forEach(fine=>{
                fine.offences.forEach(fineOffence=>{
                    if(fineOffence.provision==offence.provision){
                        total++;
                        console.log(total)
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


