const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        trim:true,
        unique:[true,"email already exists enter correct password or try with different email"],
        index: { unique: true },
        required:true
    },
    password: {
        type: String,
        trim:true,
        required:true
    },
    coordinate:{
        type:String,
        default:null
    }

})

module.exports = mongoose.model('user', userSchema)