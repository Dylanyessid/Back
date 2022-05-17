"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const qualifiedUser = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    areas: [{
            type: String,
        }]
});
const QualifiedUser = mongoose_1.default.model("QualifiedUser", qualifiedUser);
exports.default = QualifiedUser;
