const {pick,omit} = require('lodash')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//User registeration

module.exports.register = (req,res) => {
    const {body} = req
    const data = pick(body,['email','password','profile'])
    const user = new User(data)
    user.save()
        .then((user)=>{
            res.json('success')
        })
        .catch((err)=>{
            if(err.keyValue.email===body.email)
            {
                res.json({notice:`${err.keyValue.email} already exists`})
            }
            else{
                res.json(err)
            }
        })
}

//User login

module.exports.login = (req,res) => {
    const {email,password} = req.body
    User.findOne({email})
        .then((user)=>{
            if(user)
            {
            bcrypt.compare(password,user.password)
                .then((match)=>{
                    if(match){
                        const data = {_id:user._id,email:user.email}
                        const token = jwt.sign(data,process.env.JWT_KEY,{expiresIn:'2d'})
                        res.json({token : `Bearer ${token}`})
                    }
                    else
                    {
                        res.json({errors:{message:"invalid email or password"}})
                    }
                })
            } 
            else
            {
                res.json({errors:{message:"invalid email or password"}})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//Get User

module.exports.data = (req,res)=>{
    const {_id} = req.tokenData
    User.findOne({_id})
        .then((user)=>{
            const obj = JSON.parse(JSON.stringify(user))
            res.json(omit(obj,['_id','password']))
        })
        .catch((err)=>{
            res.json(err)
        })
}

//Update profile picture

module.exports.update = (req,res)=>{
    const {_id} = req.tokenData
    const imageUrl = req.file.path

    User.findOneAndUpdate({_id},{img:imageUrl},{new:true})
        .then((data)=>{
            const obj = JSON.parse(JSON.stringify(data))
            res.json(pick(obj,['img']))
        })
        .catch((err)=>{
            res.json(err)
        }) 
}