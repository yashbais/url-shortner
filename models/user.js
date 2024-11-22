const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
},{timeStamp:true})

const User = mongoose.model('user',userSchema)

module.exports = User;