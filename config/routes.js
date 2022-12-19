const express = require('express')
const router = express.Router()
const multer = require('multer')
const authentication = require('../middleware/authentication')
const userCtrl = require('../app/controllers/userCtrl')
const budgetCtrl = require('../app/controllers/budgetCtrl')
const categoryCtrl = require('../app/controllers/categoryCtrl')
const expensesCtrl = require('../app/controllers/expensesCtrl')
const monthCtrl = require('../app/controllers/monthCtrl')

// To store image in server 
// const storage = multer.diskStorage({  
//     destination: (req,file,cb)=>{
//         cb(null,'uploads')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({storage})

const upload = multer({dest:'uploads/'})

//user API
router.post('/api/user/register',userCtrl.register)
router.post('/api/user/login',userCtrl.login)
router.get('/api/user/data',authentication, userCtrl.data)
router.put('/api/user/data',authentication,upload.single('image'),userCtrl.update)

//Month API 
router.post('/api/user/month',authentication, monthCtrl.create)
router.get('/api/user/month', authentication, monthCtrl.list)
router.get('/api/user/month/:id', authentication, monthCtrl.get)

//Budget API
router.put('/api/user/budget',authentication, budgetCtrl.update)
router.get('/api/user/budget',authentication, budgetCtrl.list)

//Category API
router.post('/api/user/category',authentication, categoryCtrl.create) 
router.get('/api/user/category/list', authentication, categoryCtrl.list)
router.put('/api/user/category/:id', authentication, categoryCtrl.update) //update, delete, restore

//Expense API
router.post('/api/user/expense', authentication, expensesCtrl.create)
router.get('/api/user/expenses', authentication, expensesCtrl.list)
router.get('/api/user/category-wise-list',authentication, expensesCtrl.categoryWiseList)
router.put('/api/user/expenses/:id', authentication, expensesCtrl.update)

module.exports = router