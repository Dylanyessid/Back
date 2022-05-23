"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requests_controllers_1 = require("../controllers/requests.controllers");
const Router = express_1.default.Router();
Router.post("/createNewRequest", requests_controllers_1.createRequest);
Router.get("/getRequest/:user", requests_controllers_1.getRequest);
Router.put("/acceptRequest/:request", requests_controllers_1.acceptRequest);
exports.default = Router;
