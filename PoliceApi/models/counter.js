const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  value: {
    type: Number,
    required: true,
  }
  });
  
const Counter = mongoose.model('counter',counterSchema);
exports.Counter = Counter; 
