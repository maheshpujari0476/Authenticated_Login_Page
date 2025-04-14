import express from "express"
const router = express.Router()
import {User} from "./models/user.js"
import {db} from "./models/mongo.js"
import jwt from "jsonwebtoken"
import multer from "multer"
import bcrypt from "bcrypt"
import crypto from "crypto"
import argon2 from "argon2"
import fs from "fs"
import cors from "cors"
import path from "path"
import cookieParser from  "cookie-parser"
import { connect } from "http2"
import { arch } from "os"


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        const {email} = req.body;
        cb(null,`${email}-${file.originalname}`)
    },
})

const upload = multer({ storage })


router.post('/adduser',upload.any(),async(req,res)=>{

 
    // console.log(req.body)
    // const data = req.body;
    //  const user = await new User(data)

    // const users =await  User.find({})
    // const user = await users.map((user)=> user.email === email && user.password===password);
    // if(user){
    //     console.log('user already exist use another email or password')
    //     return res.json('user already exist');
    // }
    //     else{
    //         const user = new User({email,password})
    //         const response = await user.save()
    //         console.log('data saved successfully')
    //         return res.json(response)
    //     }

  
try{
    const {name,email,password} = req.body;
    // const file = req.file;
    // console.log("File:", file);
    const pastuser=await User.find({});
    // console.log(pastuser)
    const present = await pastuser.some((user)=> user.email === email && user.password===password);
    // console.log(present)
    if(present){
        console.log('user already exist try another email or password')
        return res.json('user already exist try anothe email or password');
    }else{
    const user = new User({name,email,password})
    const response = await user.save()
    const filepath = req.files.map((file)=> file.path);
    // console.log('data saved successfully',response)
    return res.json({
        message:'data uploaded succefully',
        data:{name,email,password},
        file:filepath,
    });
}
}catch(error){
 console.log('Error',error.message)
 return res.status(404).json({error:error.message})
}
 
})

router.get('/',async(req,res)=>{
    const user = await User.find({})
    console.log(user)
    return res.json(user)
    
})


router.put('/update',async(req,res)=>{
  const user = await User.findOneAndUpdate({name:'maheshkumar1'},{name:'Maheshpujari'},{new:true})
  console.log(user)
  return res.json(user)
})


router.put('/addimage',upload.any(),(req,res)=>{
   console.log('file uploaded sucessfully', req.file)
   return res.json(req.file)
})

router.post('/hash',upload.any(),async(req,res)=>{
//   const {password,email,name} = req.body;
//   req.session.name= name;
//   req.session.email=email
//   req.session.password=password
// req.session.user=req.body
//   const hash= await argon2.hash(password)
//   console.log(hash)
//   const compare= await argon2.verify(hash,password)
//   if(compare){
//     console.log('password match ')
//     //return res.json('password match')
//   }
//   else{
//     console.log('incorrect password')
//     //return res.json('incorrect password')
//   }
//   return res.json(hash)

// const users= await User.find({})
// const user = await  users.map((user)=> user.email === email)

if(req.session){
    // console.log(`${req.session.name}`);
    // console.log(`${req.session.password}`);
    // console.log(`${req.session.email}`);
    // console.log(req.session)
console.log(req.session)
console.log(req.cookies)

return res.json({
    message:'Session got successfully',
    sessionData:req.session,
    data:req.cookies,
})
}else{
    console.log('no session id present');
}
// if(user){
//     // const email = req.session.email
//     const name1= req.session.name
//     const email= req.session.email
//     if(user){
//     req.session.user=user;
//     console.log('login successfull')
//     }else{
//       console.log('access denied login again');
//     }
//     console.log(name1,email)
//     // console.log(req.session.user.password)
//     // console.log(req.session.user.email)
//     return res.json('user login succesfull')
// }else{
//     return res.json('invalid credentials');
// }
})



router.post('/setsession',upload.any(),async(req,res)=>{
    // const {name,password,email} = req.body;
    // console.log(name,email,password)
    // req.session.name=name;
    // req.session.password=password;
    // req.session.email=email
//  req.session.setsession=req.body
//     console.log(req.session)
//     // res.cookie('username','maheshpujari',{maxAge:60 * 30})
//     return res.send({
//         message:'session set successfully',
//         sessionData:req.session
//     });
const user=req.body
req.session.sessionset=user;
res.cookie('username',user,{maxAge:60000})
console.log(req.session)
return res.json({
    message:"session set successfully",
    sessionData:req.session
})
})

router.post('/token',upload.any(),(req,res)=>{
    const data = req.body;
    const secretKey = 'firsttoken';
     const token = jwt.sign(data,secretKey,{expiresIn:'3h'});
     console.log(token)
     return res.json({
        message:'token created successfully',
        data:token
     })
})

router.delete('/logout',(req,res)=>{
    req.session.destroy(err =>{
   if(err) return res.json('error occures');
   res.clearCookie('connect.sid')
  res.json('session destroyed successfully');
    })
})

router.get('/register',(req,res)=>{
    res.render('index.ejs')
})


const secretKey = 'mysecret';
router.post('/register',upload.any(),async(req,res)=>{
    const {name,email,password} = req.body;
    
    if(!name && !email && !password){
        console.log('enter full credentials')
        return res.render('index.ejs')
    }
   
    // const hash= await bcrypt.hash(password,10);
    const hash = await argon2.hash(password)
    const user = new User({name,email, password:hash})
    await user.save();
    console.log('user created successfully',user)
     return res.render('register.ejs',{name})
})

router.get('/login',(req,res)=>{
    return res.render('login.ejs')
})




router.post('/login',upload.any(),async(req,res)=>{
    // const {email,password} = req.body;
    try{
    const {email,password} = req.body;
    if(!email && !password){
        console.log('this email and password doesnot exist u need to signup')
        return res.render('login.ejs')
    }
 
const user = await User.findOne({ email })
    if(!user) return res.render('index.ejs');
        const isPasswordCorrect= await argon2.verify(user.password , password)
        if(!isPasswordCorrect){
            console.log('password is wrong')
             return res.render('index.ejs')
        }

        
        req.session.user=user
        res.cookie('username',user.name,{maxAge:60000})
        const token = jwt.sign({id:user._id, email:user.email},secretKey,{expiresIn:'4h'})
        // console.log(token)
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:4 * 60 * 60 * 1000
    })
    console.log(req.session)
    return res.render('welcome.ejs')
}catch(error){
    console.log('error occured',{message:error.message})
    return res.json({message:error.message})
}
})





const authenticate=(req,res,next)=>{
    // console.log(req.session.user,req.cookie.token)
   try{
    if(req.session.user && req.cookies.token){
        next();
    }else{
        return res.render('login.ejs')
    }
  }catch(error){
    console.log('error occured')

    return res.json('something went wrong')
  }
}


  router.get('/mainpage',authenticate,(req,res)=>{

      console.log(req.session.user,req.cookies.token)

      return res.render('secrect.ejs');
// console.log('helo')
  })







export {
    router,
}