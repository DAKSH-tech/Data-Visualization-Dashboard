const express=require('express');
const app=express();
const port=8000;
const path=require('path');
const dotenv=require('dotenv').config();
const mongoose = require('mongoose');
const db=require('./config/mongoose');
const bodyParser = require('body-parser')
const fs = require('fs');
const Datamodel=require('./model/data.js');
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.get('/get/data/:querydata',async function(req,res){
    const keydata=req.params.querydata;
    await Datamodel.find({},`${keydata}`,(err, docs) => {
        if (err) {
            console.log('Failed to retrieve the Course List: ' + err);
            return;
        }
        return res.send(docs);
    }).clone().catch(function(err){ console.log(err)});
})
// fs.readFile('./jsondata.json',async function(err, data){
//     try{
//         var student = JSON.parse(data);
//         let post=await Datamodel.insertMany(student);
//     }catch(err){
//         console.log('Error in creating posts');
//         return;
//     }
// });
app.listen(port,function(err,port){
    if(err){
        console.log('Problem in extablishing Server');
    }
    console.log('Server Running');
})