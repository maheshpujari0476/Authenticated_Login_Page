import express from "express"
const router = express.Router()
import {User} from "./models/user.js"
import {db} from "./models/mongo.js"
import multer from "multer"
import bcrypt from "bcrypt"
import fs from "fs"
import cors from "cors"
import path from "path"
// router.get('/', (req, res) => {
//     console.log('hello from home');
//     res.send('hello from home page');
// });
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

  
// try{
//     const {name,email,password} = req.body;
//     // const file = req.file;
//     // console.log("File:", file);
//     const pastuser=await User.find({});
//     // console.log(pastuser)
//     const present = await pastuser.some((user)=> user.email === email && user.password===password);
//     // console.log(present)
//     if(present){
//         console.log('user already exist try another email or password')
//         return res.json('user already exist try anothe email or password');
//     }else{
//     const user = new User({name,email,password})
//     const response = await user.save()
//     const filepath = req.files.map((file)=> file.path);
//     // console.log('data saved successfully',response)
//     return res.json({
//         message:'data uploaded succefully',
//         data:{name,email,password},
//         file:filepath,
//     });
// }
// }catch(error){
//  console.log('Error',error.message)
//  return res.status(404).json({error:error.message})
// }











//  await user.save()
//  .then(()=> {
//     console.log('data saved successfully')
//     res.status(201).json(user)
//  }).catch((error)=>{
//     console.log('error while saving user')
//     return res.status(500).json('internal server error',error)
//  })




try{
  
const {name,email,password} = req.body;
if(!email && !password){
    return res.json('enter email and password in correct form')
}
// const user = await User.find({})
// const pastuser= await user.some((user)=> user.email === email );
const pastuser = await User.findOne({ email })
if(pastuser){
    const compare = await bcrypt.compare(password,pastuser.password)

if(compare){
     console.log(' email already exist try another email');
     return res.json('email already exist');
}else{
    console.log('password already exist')
    return res.json('password already exist')
}
};
// console.log(typeof req.body.password); // should be string
 
// const pass = req.body.password
const hashpass= await bcrypt.hash(password,10)
const user1 = new User({name,email,password:hashpass})
const response = await user1.save()
console.log(response)
return res.json(response)
// console.log(typeof hashpass)
// const dbpass= await user.map((user)=> user.password);
// console.log(dbpass)
// console.log(typeof dbpass); 
// console.log(pastuser.password)

}catch(error){
    console.log(error.message)
    return res.json({error:error.message})
}
 
})

router.get('/allusers',async(req,res)=>{
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

export {
    router,
}