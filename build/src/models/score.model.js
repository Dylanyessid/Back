"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const score = new mongoose_1.default.Schema({
    answer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    isPositive: {
        type: Boolean,
        required: true
    }
});
const Score = mongoose_1.default.model("Score", score);
exports.default = Score;
