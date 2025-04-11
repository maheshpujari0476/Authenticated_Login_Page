import express from "express";
 import {db} from "./models/mongo.js"
 import {User} from "./models/user.js"
import colors from "colors"
import cors from "cors"
import bodyParser from "body-parser";
import session from "express-session"
import bcrypt from "bcrypt"
const app = express();
const port = 3000;
import {router} from "./hello.js"
import { Session } from "inspector/promises";
import MongoStore from "connect-mongo";
import cookieParser  from "cookie-parser";
import path from 'path'



const logger =(req,res,next)=>{

    const colormethod={
        GET:'green',
        POST:'blue',
        PUT:'yellow',
        DELETE:'red'
    }
    const color = colormethod[req.method] || 'white';
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`[color]);
    next();
}
// app.use(session({
//   secret:'mysecret',
//   resave:false,
//   saveUninitialized:true,
//   cookie:{magAge:70000}
// }))
// app.use(session({
//    secret:'mysecret',
//    resave:false,
//    saveUninitialized:false,
//    store:MongoStore.create({
//    mongoUrl:'mongodb://127.0.0.1:27017/sessionmongo',
//    collectionName:"sessions",
//    ttl:60 * 60,
//    }),
//    cookie:{
//     maxAge:6000 * 30,
//     secure:false
//    }

// }))
app.use(session({
    secret:'mahesh',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/sessionmongo',
        collectionName:'sesion',
        ttl:60 * 60,
    }),
    cookie:{
        maxAge:6000 * 30,
        secure:false,
    }
}))

 app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(logger)
app.use(bodyParser.json())
app.use(cors())
app.set("view engine",'ejs')
app.set("views",path.resolve("./views"))
app.use('/user',router);


app.listen(port, () => console.log(`server started on port ${port}`));