const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
      }
  });
  

const User = mongoose.model('user',userSchema);


exports.User = User; 
