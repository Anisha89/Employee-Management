const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser= require('body-parser')

const EmployeeRoute = require('./routes/Employeeroute')
const AuthRoute = require('./routes/Authroute')

 
mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:true})
const db = mongoose.connection
db.on('error',(err) =>{
    console.log(err)
})
db.once('open',()=>{
    console.log('Database connection successfully')
})
const app =express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.port || 8000
app.listen(PORT,() =>{
    console.log( `server is running at port ${PORT}`)
})

app.use('/api/employee',EmployeeRoute)
app.use('/api',AuthRoute)
