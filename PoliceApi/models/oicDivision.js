const mongoose = require('mongoose');

const oicDivisionSchema = new mongoose.Schema({
    oicDivisionName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
     inspectorName:{
        type:String,
     },
     phoneNo: {
        type: Number,
        minlength: 10,
        maxlength: 10
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 50
      }
  });
  
const OicDivision = mongoose.model('oicDivision',oicDivisionSchema);
exports.OicDivision = OicDivision; 
