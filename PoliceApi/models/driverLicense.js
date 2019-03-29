const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    _id:{
       type:String,
       required:true,
   },
   Name:{
       type:String,
       required:true,
   },
   Address:{
    type:String,
    required:true,
   },
   NatonalId:{
    type:String,
    required:true,
   },
   DateOfBirth:{
    type:Date,
    required:true,
   },
   DateOfIssue:{
    type:Date,
    required:true,
   },
   DateOfExpire:{
    type:Date,
    required:true,
   },
   CatogeriesOfVehicles:[
       {
           type:String
       }
   ]
});
  

const Driver = mongoose.model('driver',driverSchema);


exports.Driver = Driver; 
