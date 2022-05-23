import express from 'express';
import { createQuestion, getQuestions, getUserQuestions, getPrivateQuestions } from '../controllers/questions.controllers';



const Router = express.Router();

Router.post("/createNewQuestion", createQuestion);
Router.get("/getQuestions", getQuestions);
Router.get("/getPrivateQuestions", getPrivateQuestions)
Router.get("/getUserQuestions/:user", getUserQuestions);

export default Router;