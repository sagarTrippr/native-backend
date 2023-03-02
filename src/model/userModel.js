const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        trim:true,
        unique:true,
        index: { unique: true },
        required:true
    },
    password: {
        type: String,
        trim:true,
        required:true
    },
    lat:{
        type:String,
        default:null
    },
    long:{
        type:String,
        default:null
    }

})

module.exports = mongoose.model('user', userSchema)