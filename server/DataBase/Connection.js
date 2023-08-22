const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URL;
mongoose.connect(URL,{usenewUrlParser:true})
.then(()=>{
    console.log("connection sucessfully");
}).catch(err =>{
    console.log(err);
})
