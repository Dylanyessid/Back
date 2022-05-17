"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controllers_1 = require("../controllers/questions.controllers");
const Router = express_1.default.Router();
Router.post("/createNewRequest", questions_controllers_1.createQuestion);
Router.get("/getRequest", questions_controllers_1.getQuestions);
exports.default = Router;
