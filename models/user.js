import mongoose from "mongoose"
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
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    }
})

const User=new mongoose.model('User',userSchema)

export{
    User,
}