"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedQuestions = exports.getUserPrivateQuestions = exports.getPrivateQuestions = exports.getUserQuestions = exports.getQuestions = exports.getQuestion = exports.createQuestion = exports.createQuestionWithFile = void 0;
const questions_model_1 = __importDefault(require("../models/questions.model"));
const createQuestionWithFile = (req, res) => {
    return res.status(200).json("Si");
};
exports.createQuestionWithFile = createQuestionWithFile;
const createQuestion = (req, res) => {
    const question = new questions_model_1.default(req.body);
    console.log(req.body);
    console.log(question);
    question.designedUser = null;
    question.save((err, question) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json({ message: "Pregunta creada" });
    });
};
exports.createQuestion = createQuestion;
const getQuestion = (req, res) => {
    questions_model_1.default.findById(req.params.question, (err, question) => {
        return res.status(200).json(question);
    });
};
exports.getQuestion = getQuestion;
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    questions_model_1.default.find({ isPrivate: false }, (err, questions) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(questions);
    });
});
exports.getQuestions = getQuestions;
const getUserQuestions = (req, res) => {
    questions_model_1.default.find({ user: req.params.user, isPrivate: false }, (err, questions) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(questions);
    });
};
exports.getUserQuestions = getUserQuestions;
const getPrivateQuestions = (req, res) => {
    questions_model_1.default.find({ user: { $ne: req.params.user }, isPrivate: true, designedUser: null, area: req.params.area }, (err, questions) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(questions);
    });
};
exports.getPrivateQuestions = getPrivateQuestions;
const getUserPrivateQuestions = (req, res) => {
    questions_model_1.default.find({ user: req.params.user, isPrivate: true }, (err, questions) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(questions);
    });
};
exports.getUserPrivateQuestions = getUserPrivateQuestions;
const getAssignedQuestions = (req, res) => {
    questions_model_1.default.find({ designedUser: req.params.user }, (err, questions) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(questions);
    });
};
exports.getAssignedQuestions = getAssignedQuestions;
