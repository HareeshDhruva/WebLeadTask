const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const router = require('./Router/Router');
require('dotenv').config();
require('./DataBase/Connection');
require('./Router/Router');
const User = require('./models/user-Schema')
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(cors());
const PORT = process.env.PORT;

app.get('/', async (req,res)=>{
    const user = await User.find({role:'USER'});
    res.status(200).json(user); 
});

app.get('/admin', async (req,res)=>{
    const user = await User.find({role:'ADMIN'});
    res.status(200).json(user); 
});

app.post('/remove', async (req,res)=>{
    const {email} = req.body;
    console.log(email);
    const user = await User.findOneAndDelete({email});

    if(user){
        console.log("delete user")
        res.status(200).json(user); 
    }
    else{
        console.log("not Delete");
    }
});

app.post('/register',router);
app.post('/update',router);
app.post('/login',router);

app.listen(PORT);