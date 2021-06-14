const mongoose = require('mongoose');

// define user schema
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50,
        unique : true
    },
    email : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 1024
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

// load the schema into a model - to create and read documents from the database
const User = new mongoose.model('User',userSchema);

exports.User = User;