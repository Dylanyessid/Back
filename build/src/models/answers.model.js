"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const answerSchema = new mongoose_1.default.Schema({
    question: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "questions"
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    answer: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true
    }
});
const Answer = mongoose_1.default.model("Answer", answerSchema);
exports.default = Answer;
