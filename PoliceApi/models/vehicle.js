const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  }
  });
  
const Vehicle = mongoose.model('vehicle',vehicleSchema);
exports.Vehicle = Vehicle; 
