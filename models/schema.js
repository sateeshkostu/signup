const mongoose = require('mongoose');

const SignupSchema =  new mongoose.Schema({
    Username: { type: String, required: true },
    Email : { type : String, required: true },
    Password : { type : String, required: true },
    Confirmpassword : { type : String, required: true }
    
  });

module.exports = mongoose.model('Signup', SignupSchema);