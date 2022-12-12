const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use('/uploads',express.static('uploads'))
require('dotenv').config()
const port = 3210

const configureDb = require('./config/database')
configureDb()
const router = require('./config/routes')
app.use(router)

app.listen(port,()=>{
    console.log('server is running on port',port)
})