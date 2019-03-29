const mongoose = require('mongoose');

const offenceSchema = new mongoose.Schema({
    sectionOfAct: {
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
      }
  });
  

const Offence = mongoose.model('offence',offenceSchema);


exports.Offence = Offence; 
