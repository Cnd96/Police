const mongoose = require('mongoose');


const rankSchema = new mongoose.Schema({
    _id:{
        type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  });
  
  const Rank = mongoose.model('Rank', rankSchema);

exports.Rank = Rank; 
exports.rankSchema = rankSchema;