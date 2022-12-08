const Employee= require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox209a75e758c7425cab9b03459b30d092.mailgun.org";
const mg = mailgun({apiKey: "9838f1e2b947911784a1d42f4278a4a5-0d2e38f7-5f5bdfe2", domain: DOMAIN});
const { json } = require('body-parser')

const register = (req,res,next) =>{
    bcrypt.hash(req.body.password,10,function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new Employee({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
    
        user.save()
        .then(user =>{
            res.json({
                message:'User Added Successfully!'
            })
        })
        .catch(error =>{
            res.json({
                message:'An Error Occured!'
            })
        })
    })
    
}


const login = (req,res,next) =>{
    var username =req.body.username
    var password = req.body.password
    User.findOne({$or: [{email:username},{phone:username}]} )
    .then(user =>{
        if(user){
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
                res.json({
                    error:err
                })
            }
            if(result){
                let token = jwt.sign({name: user.name}, 'AzQ,PI)0(' ,{expiresIn:'1h'})
                res.json({
                    message:'LoginSuccessful!',
                    token
                })
            }
            else{
                res.json({
                    message:'password does not match'
                })
            }
        })
        }
        else{
            res.json({
            message:'no user found'
            })
        }
    })

}


const forgotpassword =(req,res) =>{

    const { email } = req.body;
    User.findOne({email},(err,user)=>{
        if( err|| !user){
            return res,status(400).json({error:"user email does not exist"});
        }
        const token = jwt.sign({_id:user._id}, 'AzQ,PI)0(' ,{expiresIn:'1h'})
        const data ={
            from: 'noreply@hello.com',
            to: email,
            subject: 'Account Activation Link',
            html:`<h2> Please click on given link to reset your password</h2>
            <p>${'http://localhost:3000'}/resetpassword/${token}</p>
            
            `
        };

        return user.updateOne({resetLink: token},function(err,success){
            if(err){
                return res.status(400).json({ error : "reset password link error"});
            }
            else{
             mg.messages().send(data,function(error,body){
                 if(error){
                     return res.json({
                         error:err.message
                     })
                 }
           return res.json({message: 'Email has been sent ,kindly follow the instruction'})
             });
            }
        })
    })



}


const logout =(req,res)=>{
User.findOneAndUpdate({_id:req.params_id},{token:""},(err,doc) =>{
    if(err) return res.json({success: false ,err})
    return res.status(200).send({
        success:true
    })
})
}

module.exports = {
    register,login,forgotpassword,logout,
}


