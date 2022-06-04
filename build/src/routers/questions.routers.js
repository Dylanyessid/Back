"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controllers_1 = require("../controllers/questions.controllers");
const Router = express_1.default.Router();
Router.post("/createNewQuestion", questions_controllers_1.createQuestion);
Router.post("/createNewQuestionWithFile", questions_controllers_1.createQuestionWithFile);
Router.get("/getQuestion/:question", questions_controllers_1.getQuestion);
Router.get("/getQuestions", questions_controllers_1.getQuestions);
Router.get("/getAssignedQuestions/:user", questions_controllers_1.getAssignedQuestions);
Router.get("/getPrivateQuestions/:user/:area", questions_controllers_1.getPrivateQuestions);
Router.get("/getUserPrivateQuestions/:user", questions_controllers_1.getUserPrivateQuestions);
Router.get("/getUserQuestions/:user", questions_controllers_1.getUserQuestions);
exports.default = Router;
