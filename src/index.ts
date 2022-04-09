import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import usersRouter from './routers/user.routers'
import questionsRouter from './routers/questions.routers'
import answersRouter from './routers/answers.routers'
import { dbConnect } from './database';

const app = express();
const PORT = 4000;

const main = async() =>{
    app.listen(PORT, ()=>{
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

app.use("/users", usersRouter);
app.use("/questions", questionsRouter),
app.use("/answers", answersRouter)
