const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type : String, required : true, unique : true, },
    password : {type : String, required : true, trim : true},
});


module.exports = mongoose.model('squartuser', userSchema )

