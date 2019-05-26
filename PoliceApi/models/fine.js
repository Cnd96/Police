const mongoose = require('mongoose');
const {offenceSchema} = require('./offence');

const fineSchema = new mongoose.Schema({
    
      _id:{
        type:String,
        required:true
      },
      licenseNo:{
        type:String,
        required:true,
      },
      driverName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 250
      },
      driverAddress:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 250
      },
      CatogeriesOfVehicles:[
        {
            type:String
        }
      ],
      vehicleNo:{
        type:String,
        required:true,
      },
      offences:[
        {
            type:offenceSchema,
            required:true
        },
      ],
      date:{
        type:Date,
        default:Date.now
      },
      time:{
        type:String,
        default: new Date().toLocaleTimeString(),
        required:true,
      },
      validUntil:{
        type:Date,
        required:true,
      },
      place:{
        type:String,
        required:true,
      },
      policeman: {
        type: new mongoose.Schema({
            _id:{
                type:String,
                required:true,
            },
            name:{
                type:String,
                required:true,
            },  
            rank:{
                type:String,
                required:true
            },
        }),
        required: true
      },
      policeStationName:{
        type:String,
        required:true,
      },
      fineStatus:{
        type:Boolean,
        required:true,
      },
      amount:{
        type:Number,
      },
      additionalPay:{
        type:Number,
        default:0
      },
      totalAmountPaid:{
        type:Number,
        default:0
      },
  });
  

const Fine = mongoose.model('fine',fineSchema);


exports.Fine = Fine; 
