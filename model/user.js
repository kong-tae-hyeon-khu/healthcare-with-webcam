const { json } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type : String, required : true, unique : true, },
    password : {type : String, required : true, trim : true},
    total_squart : {type : Number, default : 0},
    today_squart : {type : Number, default : 0},

});

userSchema.methods.passwordCheck = function(password, cb) {
    if (password === this.password) 
        cb(null, isMatch);
}



const User = mongoose.model('squartuser', userSchema )
module.exports = {User};


