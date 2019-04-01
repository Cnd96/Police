const mongoose = require('mongoose');
const {PoliceStation} = require('./policeStation');

const policemanSchema = new mongoose.Schema({
   _id:{
       type:String,
       required:true,
   },
   name:{
       type:String,
       required:true,
   },
   natonalId:{
    type:String,
    required:true,
   },
   password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
   },
   address:{
    type:String,
    required:true,
   },
   phoneNo: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
   },
   dateOfBirth:{
    type:Date,
    required:true,
   },
   role:{
    type:String,
    required:true,
   },
   policeStation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:PoliceStation,
   }
});

const Policeman= mongoose.model('policemen',policemanSchema);
exports.Policeman = Policeman; 
