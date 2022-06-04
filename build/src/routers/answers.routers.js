"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const answers_controllers_1 = require("../controllers/answers.controllers");
answers_controllers_1.addScore;
const Router = express_1.default.Router();
Router.post("/createAnswerForPrivateQuestion/:user/:question", answers_controllers_1.responsePrivateAnswer);
Router.post("/createAnswer", answers_controllers_1.createAnswer);
Router.post("/score/:answer", answers_controllers_1.createAnswer);
Router.get("/getAnswers/:questionId", answers_controllers_1.getAnswersOfQuestion);
Router.get("/getScore/:answer", answers_controllers_1.getScore);
Router.put("/qualify/:answerId", answers_controllers_1.addScore);
Router.delete("/removeScore/:answerId/:user", answers_controllers_1.removeScore);
Router.get("/getUserAnswers/:user", answers_controllers_1.getUserAnswers);
Router.get("/getScoredAnswers/:user/:question", answers_controllers_1.getScores);
exports.default = Router;
