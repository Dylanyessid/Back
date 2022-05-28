import express from 'express';
import { createQuestion, getQuestions, getUserQuestions, getPrivateQuestions, createQuestionWithFile } from '../controllers/questions.controllers';



const Router = express.Router();

Router.post("/createNewQuestion", createQuestion);
Router.post("/createNewQuestionWithFile", createQuestionWithFile);
Router.get("/getQuestions", getQuestions);
Router.get("/getPrivateQuestions", getPrivateQuestions)
Router.get("/getUserQuestions/:user", getUserQuestions);

export default Router;