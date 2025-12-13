import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import http from "http"
import {Server} from "socket.io"

dotenv.config();

import yagrs from "yargs";
import { hideBin } from "yargs/helpers";

import {initRepo} from "./controllers/init.js"
import {addRepo} from "./controllers/add.js"
import {commitRepo} from "./controllers/commit.js"
import {pushRepo} from "./controllers/push.js"
import {pullRepo} from "./controllers/pull.js"
import {revertRepo} from "./controllers/revert.js"
import mainRouter from "./routes/main.router.js";


yagrs(hideBin(process.argv))
.command('start' ,'Start a new server',{},startServer)
.command('init' ,'Initialize a new repository',{},initRepo)
.command('add <file>' , 'Add a file to the repo' , (yargs)=>{yargs.positional('file' , {
    describe: "File to add to the staging area",
    type : "string"
}) ; } , (argv)=>{addRepo(argv.file)})
.command('commit <message>' , "Commit changes to the repository" , (yargs)=>{yargs.positional("message", {
    describe:"Commit Message",
    type:"string"
});} , (argv)=>{commitRepo(argv.message)})
.command("push" , "Push command to S3" , {} , pushRepo)
.command("pull", "Pull command from S3" , {} , pullRepo)
.command("revert <commitID>", "Revert to a specific commit" , (yargs)=>{yargs.positional("commitID" , {
    describe:"Commit ID to revert to" ,
    type : "string"
})}, (argv)=>revertRepo(argv.commitID) )
.demandCommand(1, 'You need at least one command').help().argv

function startServer(){
    const app = express();
    const port = process.env.PORT || 3000 ; 

    app.use(bodyParser.json())
    app.use(express.json())

    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI).then(()=>console.log("MONGODB CONNECTED!")).catch((err)=>console.error("Unable to connect : " , err))

    app.use(cors({origin: "*"}));

    app.use("/" , mainRouter)


    let user = "test"

    const httpServer = http.createServer(app);
    const io = new Server(httpServer , {
        cors : 
        {
            origin:"*" ,
            method : ["GET" , "POST"]
        },
    });
    io.on("connection" , (socket)=>
    {
        socket.on("joinRoom" , (userID)=>
        {
            user = userID;
            console.log("====")
            console.log(user)
             console.log("====")
             socket.join(userID)

        })
    });
    const db = mongoose.connection;
    db.once("open" , async()=>
    {
        console.log("CRUD operations called");
        //CRUD OPERATIONS
    });

    httpServer.listen(port , ()=>
    {
        console.log(`Server running on PORT ${port}`)
    })
}