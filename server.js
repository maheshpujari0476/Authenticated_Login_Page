import express from "express";
 import {db} from "./models/mongo.js"
 import {User} from "./models/user.js"
import colors from "colors"
import cors from "cors"
import bodyParser from "body-parser";
const app = express();
const port = 3000;
import {router} from "./hello.js"


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
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger)
app.use(bodyParser.json())
app.use(cors())
app.use('/user',router);


app.listen(port, () => console.log(`server started on port ${port}`));