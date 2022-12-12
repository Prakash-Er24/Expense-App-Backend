const { omit } = require('lodash')
const User = require('../models/user')
const Month = require('../models/month')
const Budget = require('../models/budget')
const monthCtrl = {}

//Create month

monthCtrl.create = (req,res) => {
    const {_id:user} = req.tokenData
    const { body } = req
    const month = new Month(body)
    month.user = user
    month.save()
    .then((mon)=>{
        const budget = new Budget({user, month:mon._id})
        budget.save()
        .then(()=>{
            const obj = JSON.parse(JSON.stringify(mon))
            res.json(omit(obj,['user']))
        })
        .catch((err)=>{
            res.json(err)
        })
    })
}

//List month

monthCtrl.list = (req,res) => {
    const {_id:user} = req.tokenData
    Month.find({user},'-user')
        .then((months)=>{
            res.json(months)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//Get month

monthCtrl.get = (req,res) => {
    const {_id:user} = req.tokenData
    const { id } = req.params
    Month.findOne({user, _id:id},'-user')
        .then((month)=>{
            res.json(month)
        })
        .catch((err)=>{
            res.json(err)
        })
}
module.exports = monthCtrl   