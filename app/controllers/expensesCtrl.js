const Expenses = require('../models/expenses')
const Category = require('../models/category')
const { omit } = require('lodash')

module.exports.create = async (req, res) => { //Create expense
    const {_id:user} = req.tokenData
    const { month } = req.query
    const { title, expenseDate, amount, category } = req.body
    const data = {title, user, month, expenseDate, amount, category}
    const expenses = new Expenses(data)
    expenses.save()
    .then((expense)=>{
        return Expenses.findOne({_id:expense._id, user, month}).populate('category',['-user'])
    })
    .then((expense)=>{
        const obj = JSON.parse(JSON.stringify(expense))
        res.json(omit(obj,['user']))
    })
    .catch((err)=>{
        res.json(err)
    })
}

 //Update, soft delete , restore expense

module.exports.update = (req,res) =>{
    const { id } = req.params
    const {_id:user} = req.tokenData
    const { action, month } = req.query
    const { title, expenseDate, amount, category } = req.body
    const data = {title,expenseDate,amount,category}
    if(action === 'delete'){
        Expenses.findOneAndUpdate({_id:id, user,month},{isdeleted:true},{new:true}).populate('category',['-user'])
            .then((expense)=>{
                const obj = JSON.parse(JSON.stringify(expense))
                res.json(omit(obj,['user']))
            })
            .catch((err)=>{
                res.json(err)
            })
    }
    else if(action === 'restore')
    {   
         Expenses.findOneAndUpdate({_id:id, user},{isdeleted:false},{new:true}).populate('category',['-user'])
           .then((expense)=>{
                const obj = JSON.parse(JSON.stringify(expense))
                res.json(omit(obj,['user']))
            })
            .catch((err)=>{
                res.json(err)
            })

    }
    else if(action==='update')
    {
         Expenses.findOneAndUpdate({_id:id, user, month},data,{new:true}).populate('category',['-user'])
            .then((expense)=>{
                const obj = JSON.parse(JSON.stringify(expense))
                res.json(omit(obj,['user']))
            })
            .catch((err)=>{
                res.json(err)
            })
    }     
}

//List expenses (All, deleted and non-deleted expenses)

module.exports.list = (req,res) => {
    const {_id:user} = req.tokenData
    const { action, month } = req.query
    if(action==='all')
    {
    Expenses.find({user,month},'-user').populate('category',['-user'])
        .then((expenses)=>{
            const data = expenses.map(ele=>{
                if(ele.category.isdeleted)
                {
                    ele.category.name='Deleted'
                    return ele
                } 
                else{
                    return ele
                }
            })
            res.json(data)
        })
        .catch((err)=>{
            res.json(err)
        })
    }
    else if(action==='deleted' || action === 'non-deleted')
    {
        const isdeleted = action==='deleted' ? true : false
        Expenses.find({user,month,isdeleted},'-user').populate('category',['-user'])
            .then((expenses)=>{
                const data = expenses.map(ele=>{
                    if(ele.category.isdeleted)
                    {
                        ele.category.name='Uncategorized'
                        return ele
                    } 
                    else{
                        return ele
                    }
                })
                res.json(data)
            })
            .catch((err)=>{
                res.json(err)
            })
    }
}

//Category wise expenses list

module.exports.categoryWiseList = (req,res) => {
    const {_id:user} = req.tokenData
    const { month } = req.query
    let categories = []

    Category.find({user,month})
        .then((category)=>{
            categories = [...category]
            return  Expenses.find({user,month,isdeleted:false}).populate('category',['-user'])
        })
        .then((expenses)=>{
            const data = categories.map(ele=>{ //category wise split
                return expenses.filter(exp=>JSON.stringify(ele._id)===JSON.stringify(exp.category._id))
            })
            const nonDeletedCategories = []
            const deletedCategories = []
            data.forEach(ele=>{
                if(ele.length>0)
                {
                    const categoryName = ele[0].category.name
                    const totalAmount = ele.reduce((pv,cv)=>{
                        return pv+cv.amount
                    },0)
                    const count = ele.length
                    if(!ele[0].category.isdeleted){
                        nonDeletedCategories.push({categoryName,count,totalAmount})
                    }
                    else{
                        deletedCategories.push({categoryName,count,totalAmount})
                    }
                }
             })
            
                if(deletedCategories.length>0){
                    let count = 0
                    const deletedCategoryAmount = deletedCategories.reduce((pv,cv)=>{
                        count+=cv.count
                        return pv+cv.totalAmount
                    },0)
                    const deletedObj = {categoryName:'Uncategorized',count,totalAmount:deletedCategoryAmount}
    
                    res.json([...nonDeletedCategories,{...deletedObj}])
                }
                else
                {
                    res.json(nonDeletedCategories)
                }
        })
        .catch((err)=>{
            res.json(err)
        })
    }