const mongoose = require('mongoose');

const offenceSchema = new mongoose.Schema({
      _id: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      provision: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
      },
      amount: {
        type: Number,
        required: true,
      },
      type:{
        type:Boolean,
        required:true
      },
      daysAllowed:{
        type: Number,
      }
  });
  

const Offence = mongoose.model('offence',offenceSchema);


exports.Offence = Offence; 
exports.offenceSchema = offenceSchema;