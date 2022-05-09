"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controllers_1 = require("../controllers/chat.controllers");
const Router = express_1.default.Router();
Router.post("/sendMessageTo/:id", chat_controllers_1.sendNewMessage);
exports.default = Router;
