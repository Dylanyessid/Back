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
exports.responsePrivateAnswer = exports.getScore = exports.getScores = exports.removeScore = exports.addScore = exports.getUserAnswers = exports.getAnswersOfQuestion = exports.createAnswer = void 0;
const answers_model_1 = __importDefault(require("../models/answers.model"));
const questions_model_1 = __importDefault(require("../models/questions.model"));
const score_model_1 = __importDefault(require("../models/score.model"));
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
    answers_model_1.default.find({ question: req.params.questionId }, null, { sort: { score: -1 } }, (err, answers) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (answers) {
            return res.status(200).json(answers);
        }
    });
};
exports.getAnswersOfQuestion = getAnswersOfQuestion;
const getUserAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    answers_model_1.default.find({ user: req.params.user }, (err, answers) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(answers);
    });
});
exports.getUserAnswers = getUserAnswers;
const addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ObjectId = require('mongoose').Types.ObjectId;
    const qAnswer = yield answers_model_1.default.findById(req.params.answerId);
    if (qAnswer) {
        const data = { answer: new ObjectId(req.params.answerId), user: new ObjectId(req.body.user), isPositive: req.body.isPositive };
        const previousScore = yield score_model_1.default.findOne({ answer: req.params.answerId, user: req.body.user });
        if (!previousScore) {
            let score = new score_model_1.default(data);
            yield score.save();
            const cP = yield score_model_1.default.countDocuments({ answer: req.params.answerId, isPositive: true });
            const cN = yield score_model_1.default.countDocuments({ answer: req.params.answerId, isPositive: false });
            qAnswer.score = cP - cN;
            yield qAnswer.save();
            return res.status(200).json(qAnswer);
        }
        if (previousScore) {
            if (previousScore.isPositive == data.isPositive) {
                return res.status(400).json({ message: "Ya has  indicado que te gusta la respuesta" });
            }
            else {
                score_model_1.default.findOneAndUpdate({ answer: req.params.answerId, user: req.body.user }, { isPositive: data.isPositive }, [], (err, score) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    score_model_1.default.countDocuments({ answer: req.params.answer, isPositive: true }, (err, countP) => {
                        score_model_1.default.countDocuments({ answer: req.params.answer, isPositive: false }, (err, countN) => {
                            qAnswer.score = countP - countN;
                            qAnswer.save();
                            return res.status(200).json({ message: "Actalizado puntaje correctamente" });
                        });
                    });
                });
            }
            ;
        }
    }
});
exports.addScore = addScore;
const removeScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    score_model_1.default.findOneAndRemove({ answer: req.params.answerId, user: req.params.user }, (err, score) => {
        if (err) {
            return res.status(500).json(err);
        }
        answers_model_1.default.findById(req.params.answerId, (err, qAnswer) => {
            if (err) {
                return res.status(500).json(err);
            }
            score_model_1.default.countDocuments({ answer: req.params.answer, isPositive: true }, (err, countP) => {
                score_model_1.default.countDocuments({ answer: req.params.answer, isPositive: false }, (err, countN) => {
                    console.log(countP);
                    qAnswer.score = countP - countN;
                    qAnswer.save();
                    return res.status(200).json(score);
                });
            });
        });
    });
});
exports.removeScore = removeScore;
const getScores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    score_model_1.default.find({ question: req.params.question, user: req.params.user }, (err, scores) => {
        return res.status(200).json(scores);
    });
});
exports.getScores = getScores;
const getScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let positives = 0;
    let negatives = 0;
    let t = yield score_model_1.default.countDocuments({ answer: req.params.answer, isPositive: true });
    let p = yield score_model_1.default.countDocuments({ answer: req.params.answer, isPositive: false });
    positives = t;
    negatives = p;
    res.status(200).json({ negatives, positives });
});
exports.getScore = getScore;
const responsePrivateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = yield answers_model_1.default.find({ question: req.params.question });
        if (answers.length == 0) {
            const question = yield questions_model_1.default.findById(req.params.question);
            question.designedUser = req.params.user;
            yield question.save();
        }
        const data = (req.body);
        const newAnswer = new answers_model_1.default(data);
        newAnswer.score = 0;
        yield newAnswer.save();
        return res.status(200).json(newAnswer);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
exports.responsePrivateAnswer = responsePrivateAnswer;
