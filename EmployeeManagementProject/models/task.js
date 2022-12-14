const mongoose = require('mongoose');
const Schema = mongoose.Schema
const taskSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    group:{
        type:String
    },
    unit:{
        type:Number,
     },
     max:{
         type:Number
     },
     min:{
         type:Number
     },
     value:{
         type:Number
     },
     graph_color:{
         type:String
     },
     max_color:{
         type:String
     },
     min_color:{
         type:String
     },
     csv_column:{
         type:String
     },
     csv_title:{
         type:String
     }
})
const task =mongoose.model('task', taskSchema)
module.exports = task