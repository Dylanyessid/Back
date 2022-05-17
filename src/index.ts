import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import usersRouter from './routers/user.routers'
import questionsRouter from './routers/questions.routers'
import answersRouter from './routers/answers.routers'
import chatRouter from './routers/chat.routers'
import requestRouters from './routers/request.routers'
import { dbConnect } from './database';
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const PORT = 4000;

const server = http.createServer(app);
const io = new Server(server);
io.on('connection',(socket:any)=>{console.log("first");socket.emit("ping") } )
const main = async() =>{
    server.listen(PORT, ()=>{
        console.log("Connected in port: " + PORT)
        try{
            dbConnect();
        }
        catch{
            console.log("ERROR")
        }
    })
}
main();





app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));

app.use("/requests", requestRouters)
app.use("/chats", chatRouter)
app.use("/users", usersRouter);
app.use("/questions", questionsRouter),
app.use("/answers", answersRouter)
