const express = require('express')
const app = express()
const cors = require('cors')
const configureDb = require('./config/database')
const router = require('./config/routes')
require('dotenv').config()
const port = 3210

configureDb()
app.use(express.json())
app.use(cors())
app.use(router)
app.use('/uploads',express.static('uploads'))

app.listen(port,()=>{
    console.log('server is running on port',port)
})