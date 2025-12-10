import yagrs from "yargs";
import { hideBin } from "yargs/helpers";

import {initRepo} from "./controllers/init.js"
import {addRepo} from "./controllers/add.js"
import {commitRepo} from "./controllers/commit.js"
import {pushRepo} from "./controllers/push.js"
import {pullRepo} from "./controllers/pull.js"
import {revertRepo} from "./controllers/revert.js"


yagrs(hideBin(process.argv))
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
})}, revertRepo )
.demandCommand(1, 'You need at least one command').help().argv