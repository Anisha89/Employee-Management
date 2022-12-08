const express = require('express')
const task = require('../models/task')
exports.list =  async function(req,res){
    try
    {
        const getAll=await task.find();
        res.status(200).json(getAll);
    }
    catch(err){
        res.json({"err":err})
    }

}

exports.create = async function(req,res){
    try{
        const param =await new Parameter({
           name:req.body.name,
           title:req.body.title,
           group:req.body.group,
           unit:req.body.unit,
           max:req.body.max,
           min:req.body.min,
           value:req.body.value,
           graph_color:req.body.graph_color,
           max_color:req.body.max_color,
           min_color:req.body.min_color,
           csv_column:req.body.csv_column,
           csv_title:req.body.csv_title
          
       });
       const save=await param.save();
       res.status(200).json(save);
   }catch (err){
       res.json({"err":err})
   }
}