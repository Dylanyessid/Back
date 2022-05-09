"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewMessage = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const sendNewMessage = (req, res) => {
    const message = {
        sender: req.body.sender,
        destiny: req.params.id,
        message: req.body.message
    };
    const chat = new chat_model_1.default(message);
    chat.save((err, chat) => {
        if (!chat) {
            return res.status(400).json(err);
        }
        if (err) {
            return res.status(500);
        }
        return res.status(200).json(message);
    });
};
exports.sendNewMessage = sendNewMessage;
