const mongoose = require('mongoose');
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
   
    designation:{
        type:String,
        required:true
     },
    department:{
        type:String,
        required:true
    },
    email: {
        type: String,
        min: [4, 'Too short, min 4 characters are required'],
        max: [32, 'Too long, max 16 characters are required'],
        lowercase: true,
        unique: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]  
     },
    password:{
        type: String,
        min: [4, 'Too short, min 4 characters are required'],
        max: [32, 'Too long, max 16 characters are required'],
        required: 'password is required'
    },
    phone:  {
        type: Number,
        required: true,
     },
      extno:{
          type:Number,
          required:true,
    }
    },{timestamps: true})
const Employee =mongoose.model('Employee',employeeSchema)
module.exports = Employee
