"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const answers_controllers_1 = require("../controllers/answers.controllers");
const Router = express_1.default.Router();
Router.post("/createAnswer", answers_controllers_1.createAnswer);
Router.post("/score/:answer", answers_controllers_1.createAnswer);
Router.get("/getAnswers/:questionId", answers_controllers_1.getAnswersOfQuestion);
Router.put("/qualify/:answerId", answers_controllers_1.qualifyAnswer);
Router.get("/getUserAnswers/:user", answers_controllers_1.getUserAnswers);
exports.default = Router;
