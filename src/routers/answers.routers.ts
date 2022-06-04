import express from 'express';
import { createAnswer, getAnswersOfQuestion, getUserAnswers ,addScore,getScores,removeScore,getScore, responsePrivateAnswer  } from '../controllers/answers.controllers';
addScore

const Router = express.Router();

Router.post("/createAnswerForPrivateQuestion/:user/:question", responsePrivateAnswer);
Router.post("/createAnswer", createAnswer);
Router.post("/score/:answer", createAnswer);
Router.get("/getAnswers/:questionId", getAnswersOfQuestion)
Router.get("/getScore/:answer", getScore)
Router.put("/qualify/:answerId", addScore)
Router.delete("/removeScore/:answerId/:user", removeScore)
Router.get("/getUserAnswers/:user",getUserAnswers)
Router.get("/getScoredAnswers/:user/:question",getScores)

export default Router;