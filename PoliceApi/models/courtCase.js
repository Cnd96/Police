const mongoose = require('mongoose');
const {offenceSchema} = require('./offence');
const {Policeman} = require('./policeman');

const courtCaseSchema = new mongoose.Schema({
      _id:{
        type:String,
        required:true
      },
      licenseNo:{
        type:String,
        default:'No',
        required:true,
      },
      nic:{
        type:String,
        default:'No',
        required:true,
      },
      driverName: {
        type: String,
        required: true,
        maxlength: 250
      },
      driverAddress:{
        type: String,
        required: true,
        maxlength: 250
      },
      CatogeriesOfVehicles:[
        {
            type:String
        }
      ],
      vehicleNo:{
        type:String,
        default:'No',
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
      courtName:{
        type:String,
        required:true,
      },
      status:{
        type:Boolean,
        required:true,
      },
      amount:{
        type:Number,
      },
      unpaidRecordedBy:{
        type:String,
        ref:Policeman
      },
      courtRecordedBy:{
        type:String,
        ref:Policeman
      },
      courtPaidRecordedBy:{
        type:String,
        ref:Policeman
      },
      courtHearingDate:{
        type:Date,
      },
      courtHearingTime:{
        type:String,
      },
      paidDate:{
        type:Date,
        default:Date.now
      },
  });
  

const CourtCase = mongoose.model('courtCase',courtCaseSchema);


exports.CourtCase = CourtCase; 
