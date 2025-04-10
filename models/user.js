import mongoose from "mongoose"
import express from "express"
import MongoStore from "connect-mongo"
mongoose.connect("mongodb://127.0.0.1:27017/newmongo")
.then(()=> console.log('mongodb connected successfully'))
.catch(()=> console.log('error occured'))

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timeseries:true})

const User=new mongoose.model('User',userSchema)

export{
    User,
}