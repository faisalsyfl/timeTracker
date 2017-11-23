var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name : String,
    email : String,
    profile_picture : String
});

module.exports = mongoose.model('users',userSchema);