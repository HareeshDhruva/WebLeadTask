const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true,
    },

    pin:{
    type:String,
    required:true,
    },

    role:{
        type:String,
    },

    email:{
    type:String,
    required:true,
    unique:true
    },

    password:{
    type:String,
    required:true,
    min:8
    },

    mobile:{
    type:Number,
    required:true
    }, 
})

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})


const User = mongoose.model('user',UserSchema);
module.exports = User;