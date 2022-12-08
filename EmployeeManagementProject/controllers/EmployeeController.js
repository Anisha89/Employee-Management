const { response } = require('express')
const Employee = require('../models/Employee')


exports.list =  async function(req,res){
    try
    {
        const getAll=await Employee.find();
        res.status(200).json(getAll);
    }
    catch(err){
        res.json({"err":err})
    }

}
exports.create = async function(req,res){
    try{
        const employee =await new Employee({
           
           name:req.body.last,
           designation:req.body.designation,
           department:req.body.department,
           email:req.body.email,
           password:req.body.password,
           phone:req.body.phone,
           extno:req.body.extno
          
       });
       const save=await employee.save();
       res.status(200).json(save);
   }catch (err){
       res.json({"err":err})
   }
}
exports.showbyid = async function(req,res){
    try
    {
       
        const getbyID=await Employee.findById(req.params.id);
        res.status(200).json(getbyID);
    }
    catch(err){
        res.json({"err":err})
    }
    
}

exports.update = async function(req,res){
    try
    {
        const updUser=await Employee.updateOne({_id:req.params.id},{$set:
            {
                name:req.body.name,
                
                 designation:req.body.designation,
                 department:req.body.department,
                 email:req.body.email,
                 password:req.body.password,
                 phone:req.body.phone,
                 extno:req.body.extno}});
        res.status(200).json(updUser);
    }
    catch(err){
        res.json({"err":err})
    }
}

exports.delete =async function(req,res){
    try
    {
        const delUser=await Employee.remove({_id:req.params.id});
        res.status(200).json(delUser);
    }
    catch(err){
        res.json({"err":err})
    }
}

exports.search =async function(req,res){
    try{
        const serachuser = await Employee.findOne({_id: 0, firstname: 1, email: 1})
        res.status(200).json(serachuser)
    }
    catch(err){
        res.json({"err":err})
    }
}