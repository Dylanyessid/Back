"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    areas: [{
            type: String
        }],
    fileUri: {
        type: String,
        required: false
    }
});
const Question = mongoose_1.default.model("Question", questionSchema);
exports.default = Question;
