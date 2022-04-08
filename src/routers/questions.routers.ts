import express from 'express';
import { createQuestion, getQuestions } from '../controllers/questions.controllers';



const Router = express.Router();

Router.post("/createNewQuestion", createQuestion);
Router.get("/getQuestions", getQuestions);

export default Router;