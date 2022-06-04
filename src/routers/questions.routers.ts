import express from 'express';
import { createQuestion, getQuestions, getUserQuestions, getPrivateQuestions, createQuestionWithFile, getUserPrivateQuestions, getAssignedQuestions, getQuestion } from '../controllers/questions.controllers';



const Router = express.Router();

Router.post("/createNewQuestion", createQuestion);
Router.post("/createNewQuestionWithFile", createQuestionWithFile);
Router.get("/getQuestion/:question", getQuestion)
Router.get("/getQuestions", getQuestions);
Router.get("/getAssignedQuestions/:user", getAssignedQuestions);
Router.get("/getPrivateQuestions/:user/:area", getPrivateQuestions)
Router.get("/getUserPrivateQuestions/:user", getUserPrivateQuestions)
Router.get("/getUserQuestions/:user", getUserQuestions);

export default Router;