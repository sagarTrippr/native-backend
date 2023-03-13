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
    coordinates:[
        {
            lat:{type:String},
            long:{type:String},
            date:{type:Date}
        }
    ]
})

module.exports = mongoose.model('user', userSchema)