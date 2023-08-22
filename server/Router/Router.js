const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../models/user-Schema');
require('dotenv').config();
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

router.post('/register',async (req,res)=>{
    const {name, email,password, mobile} = req.body;
    if(!name || !email || !password || !mobile){
        return res.status(422);
    }
    const exist = await User.findOne({email});
    if(!exist){
        const user = req.body;
        const NewUser = User(user);
        NewUser.save();
        console.log(NewUser)
        res.status(200).json(NewUser);
    }
    else{
        res.json({message:"user already exist"});
    }
})

router.post('/update',async (req,res)=>{
    const {name, email,password, mobile} = req.body;
    const exist = await User.findOne({email});
    const filter = exist;
    const user = req.body;
    const newuser = await User.findOneAndUpdate(filter,user);
    res.status(200).json(user);
})

router.post('/login',async (req,res)=>{
    const {email, password,role} = req.body;
    if(!email || !password){
        return res.status(422).json("email and password should not be empty");
    }
    const user = await User.findOne({email,role});
    if(user){
           const LoginUser = await bcrypt.compare(password,user.password);
           if(LoginUser){
                res.status(200).json(user);
           }
           else{
             res.status(404).json('invalid password');
           }
           
        }
    else{
        console.log('user not found');
        res.status(404).json('user Not Exist');
    }
});
module.exports = router;