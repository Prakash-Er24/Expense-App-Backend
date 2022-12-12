const Budget = require('../models/budget')
const { omit } = require('lodash')

module.exports.update = (req,res)=>{  //Update Budget amount
    const {_id} = req.tokenData
    const { amount } = req.body
    const { month } = req.query
        
    Budget.findOneAndUpdate({user:_id,month} , { amount } , {new:true})
        .then((data)=>{
            const obj =JSON.parse(JSON.stringify(data))
            res.json(omit(obj,['user']))
        })
        .catch((err)=>{ 
            res.json(err)
        })
}

module.exports.list = (req,res) => { // Get budget Amount
    const { _id } = req.tokenData
    const { month } = req.query
    Budget.findOne({user:_id,month},'-user')
        .then((data)=>{
            if(data)
            {
                res.json(data)
            }
            else
            {
                res.json({notice:"No data found"})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}