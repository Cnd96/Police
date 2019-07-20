const mongoose = require('mongoose');
const {OicDivision}=require('./oicDivision');

const policeStationSchema = new mongoose.Schema({
    policeStationName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
      },
      phoneNo: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
      },
      address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      oicDivision:{
        type:mongoose.Schema.Types.ObjectId,
        ref:OicDivision,
       }
  });
  
const PoliceStation = mongoose.model('policeStation',policeStationSchema);
exports.PoliceStation = PoliceStation; 
