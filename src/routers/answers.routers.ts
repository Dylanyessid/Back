import express from 'express';
import { createAnswer, getAnswersOfQuestion, getUserAnswers ,qualifyAnswer,  } from '../controllers/answers.controllers';


const Router = express.Router();

Router.post("/createAnswer", createAnswer);
Router.post("/score/:answer", createAnswer);
Router.get("/getAnswers/:questionId", getAnswersOfQuestion)
Router.put("/qualify/:answerId", qualifyAnswer)
Router.get("/getUserAnswers/:user",getUserAnswers)

export default Router;