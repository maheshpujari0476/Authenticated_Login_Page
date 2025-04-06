import express from "express"
const router = express.Router()
import {User} from "./models/user.js"
import {db} from "./models/mongo.js"

// router.get('/', (req, res) => {
//     console.log('hello from home');
//     res.send('hello from home page');
// });

router.post('/adduser',async(req,res)=>{
    // const data = req.body;
    // const user = new User(data)
try{
    const data = req.body;
    const user = new User(data)
    const response = await user.save()
    console.log('data saved successfully')
    return res.json(response)
}catch(error){
 console.log('Error',error.message)
 return res.status(404).json({error:message})
}

//  await user.save()
//  .then(()=> {
//     console.log('data saved successfully')
//     res.status(201).json(user)
//  }).catch((error)=>{
//     console.Console('error while saving user')
//     return res.status(500).json('inter server error',error)
//  })
 
})

router.get('/allusers',async(req,res)=>{
    const user = await User.find({})
    return res.json(user)
    console.log(user)
})


router.put('/update',async(req,res)=>{
  const user = await User.findOneAndUpdate({name:'maheshkumar1'},{name:'Maheshpujari'},{new:true})
  console.log(user)
  return res.json(user)
})

export {
    router,
}