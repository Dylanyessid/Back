import express from 'express';
import { createAnswer, getAnswersOfQuestion, qualifyAnswer } from '../controllers/answers.controllers';


const Router = express.Router();

Router.post("/createAnswer", createAnswer);
Router.get("/getAnswers/:questionId", getAnswersOfQuestion)
Router.put("/qualify/:answerId", qualifyAnswer)

export default Router;