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
exports.login = exports.registerNewUser = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (req.body);
    data.password = yield bcryptjs_1.default.hash(req.body.password, 9);
    const newUser = new users_model_1.default(data);
    newUser.save((err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(user);
    });
});
exports.registerNewUser = registerNewUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLog = users_model_1.default.findOne({ email: req.body.email }, (err, user) => {
        bcryptjs_1.default.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                console.log("pasó");
                return res.status(200).json({ messgae: "Autenticación extiosa" });
            }
            else {
                return res.status(401).json({ message: "Autenticación fallida" });
            }
        });
    });
    // 
});
exports.login = login;
