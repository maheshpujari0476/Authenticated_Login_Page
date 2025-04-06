import mongoose from "mongoose"

const db=mongoose.connect("mongodb://127.0.0.1:27017/newmongo")
.then(()=> console.log('mongodb connected successfully'))
.catch(()=> console.log('error occured'))



export{
    db
}