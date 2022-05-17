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
exports.getUserAnswers = exports.qualifyAnswer = exports.getAnswersOfQuestion = exports.createAnswer = void 0;
const answers_model_1 = __importDefault(require("../models/answers.model"));
const questions_model_1 = __importDefault(require("../models/questions.model"));
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (req.body);
    const newAnswer = new answers_model_1.default(data);
    newAnswer.score = 0;
    const question = yield questions_model_1.default.findById(data.question);
    if (!question) {
        return res.status(400).json("No encontrado");
    }
    newAnswer.save((err, answer) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(answer);
    });
});
exports.createAnswer = createAnswer;
const getAnswersOfQuestion = (req, res) => {
    answers_model_1.default.find({ question: req.params.questionId }, (err, answers) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(answers);
    });
};
exports.getAnswersOfQuestion = getAnswersOfQuestion;
const qualifyAnswer = (req, res) => {
    const punctuation = req.body.punctuation;
    answers_model_1.default.findById(req.params.answerId, (err, answer) => {
        punctuation ? answer.score++ : answer.score--;
        answer.save();
        return res.status(200).json({ message: "Respuesta puntuada con éxito." });
    });
};
exports.qualifyAnswer = qualifyAnswer;
const getUserAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    answers_model_1.default.find({ user: req.params.user }, (err, answers) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(answers);
    });
});
exports.getUserAnswers = getUserAnswers;
