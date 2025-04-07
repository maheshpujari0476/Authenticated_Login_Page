import express from "express"
const router = express.Router()
import {User} from "./models/user.js"
import {db} from "./models/mongo.js"
import multer from "multer"
import fs from "fs"
import cors from "cors"
// router.get('/', (req, res) => {
//     console.log('hello from home');
//     res.send('hello from home page');
// });

router.post('/adduser',async(req,res)=>{

 
    // console.log(req.body)
    const data = req.body;
     const user = await new User(data)

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
//     const data = req.body;
//     const user = new User(data)
//     const response = await user.save()
//     console.log('data saved successfully')
//     return res.json(response)
// }catch(error){
//  console.log('Error',error.message)
//  return res.status(404).json({error:message})
//}

 await user.save()
 .then(()=> {
    console.log('data saved successfully')
    res.status(201).json(user)
 }).catch((error)=>{
    console.log('error while saving user')
    return res.status(500).json('internal server error',error)
 })
 
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
router.put('/addimage',upload.any(),(req,res)=>{
   console.log('file uploaded sucessfully', req.file)
   return res.json(req.file)
})

export {
    router,
}