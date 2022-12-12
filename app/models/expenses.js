const mongoose = require('mongoose')

const { Schema } = mongoose
const expensesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    month:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Month'
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    amount:{
        type:Number,
        required:true
    },
    expenseDate:{
        type:Date,
        required:true
    },
    isdeleted:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

const Expenses = mongoose.model('Expenses', expensesSchema)

module.exports = Expenses