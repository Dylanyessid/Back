"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    area: [{
            type: String,
            required: true,
        }],
    status: {
        type: String,
        required: true,
    }
});
const Request = mongoose_1.default.model("Request", requestSchema);
exports.default = Request;
