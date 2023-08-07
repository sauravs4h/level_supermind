const express=require("express");
const {User}=require("../models/user.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const uroute=express.Router();

uroute.get("/",(req,res)=>{
    res.send({msg:"user base route", status:"success"});
})




uroute.post("/signup",async(req,res)=>{

    const payload=req.body;

    const Email=payload.Email;
    const Password=payload.Password;
    
        let useravailable= await User.findOne({where:{Email}})
        //console.log(useravailable)

    if(useravailable){
        res.send({msg:"You are already available. please try to login",status:"error"});
    }else{
        try {
            bcrypt.hash(Password, 5,async function(err, hash) {
                if(err){
                    res.send({msg:"Something went wrong",status:"error"});

                }else{
                    payload.Password=hash;
                    const newuser= User.build(payload);
                    await newuser.save();
                    res.send({msg:"Signup Successfull",status:"success"})
                }
            });
            
        } catch (error) {
            
        }
    }

    
})

uroute.post("/login",async(req,res)=>{

    const payload=req.body;

    let Email=payload.Email;
    let Password=payload.Password;

    let user_available= await User.findOne({where:{Email:Email}});


    if(user_available){
        try {
    let user_password=user_available.Password;

            bcrypt.compare(Password, user_password, function(err, result) {
                if(err){
                    res.send({msg:"Something went wrong",status:"error"})
                }
                if(result==false){
                    res.send({msg:"Wrong Password", status:"error"});
                }

                var token = jwt.sign({ User: user_available }, 'hush');

                res.send({msg:"Login Successfull",status:"success",token:token});

            });
        } catch (error) {
            
        }
    }else{
        res.send({msg:"User is not available,please signup",status:"error"})
    }
})


module.exports = {uroute}