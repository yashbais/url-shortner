const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,
        
    },
    visitHistory:[{timeStamp:{type:Number}}]
},{timeStamp:true})

const Url = mongoose.model('url',urlSchema)

module.exports = Url;