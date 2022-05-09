"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const Router = express_1.default.Router();
Router.post("/register", users_controllers_1.registerNewUser);
Router.post("/login", users_controllers_1.login);
Router.get("/getName/:id", users_controllers_1.getUserNameByID);
exports.default = Router;
