require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const DB = require('./config/db').MONGO_URI
const port = process.env.PORT || 4000


// connect to db 
mongoose.connect(DB, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
.then(()=>{
  console.log(`DB CONNECTED SUCCESSFULLY`)
})
.catch((err)=>{
  console.log(err)
})

// bodyParser middleware
app.use(logger(process.env.SERVICE_INDEX))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// route grouping
const user = require('./routes/api/user')
app.use('/api/user', user)

const payment = require('./routes/api/payments')
app.use('/api/payments', payment)



app.listen(port, () => {
  console.log(`server started at port ${port}`)
})
