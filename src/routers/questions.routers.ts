import express from 'express';
import { createQuestion, getQuestions, getUserQuestions } from '../controllers/questions.controllers';



const Router = express.Router();

Router.post("/createNewQuestion", createQuestion);
Router.get("/getQuestions", getQuestions);
Router.get("/getUserQuestions/:user", getUserQuestions);

export default Router;