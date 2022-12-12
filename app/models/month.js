const mongoose = require('mongoose')

const { Schema } = mongoose

const monthSchema = new Schema({
    month:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

const Month = mongoose.model('Month',monthSchema)

module.exports = Month