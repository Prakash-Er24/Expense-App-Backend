const Category = require('../models/category')
const { omit } = require('lodash')

module.exports.create = (req, res) =>{  // Create category
    const { _id:user } = req.tokenData
    const { name } = req.body
    const { month } = req.query
    const data = {name, user, month}
    const category = new Category(data)
    category.save()
        .then((category)=>{
            const obj = JSON.parse(JSON.stringify(category))
            res.json(omit(obj,['user']))
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.list = (req,res) => { // List categories
    const { _id:user } = req.tokenData
    const { month } = req.query
    Category.find({user, month},'-user')
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.update = (req,res) => { // Update, delete, restore category
    const { _id:user } = req.tokenData
    const { id } = req.params
    const { body } = req
    const { action, month } = req.query
    if(action === 'delete')
    {
        Category.findOneAndUpdate({_id:id,user,month},{isdeleted:true},{new:true})
            .then((category)=>{
                res.json(category)
            })
            .catch((err)=>{
                res.json(err)
            })
    }
    
    else if(action === 'restore')
    {
        Category.findOneAndUpdate({_id:id,user,month},{isdeleted:false},{new:true})
            .then((category)=>{
                res.json(category)
            })
            .catch((err)=>{
                res.json(err)
            })
    }
    else if(action === 'edit')
    {
        Category.findOneAndUpdate({_id:id,user,month},body,{new:true})
            .then((category)=>{
                res.json(category)
            })
            .catch((err)=>{
                res.json(err)
            })
    }
    else
    {
        res.json({notice:'Define action type'})
    }
}

