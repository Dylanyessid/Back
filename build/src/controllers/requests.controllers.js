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
exports.getRequest = exports.createRequest = void 0;
const requests_model_1 = __importDefault(require("../models/requests.model"));
const createRequest = (req, res) => {
    const request = new requests_model_1.default(req.body);
    request.save((err, request) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json({ message: "Solicitud creada" });
    });
};
exports.createRequest = createRequest;
const getRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    requests_model_1.default.findById(req.params.user, (err, request) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(request);
    });
});
exports.getRequest = getRequest;
