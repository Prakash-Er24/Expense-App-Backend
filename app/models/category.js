const mongoose = require('mongoose')

const { Schema } = mongoose
const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        default:''
    },
    user : {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    month:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Month'
    },
    isdeleted : {
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category