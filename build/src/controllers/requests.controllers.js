"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptRequest = exports.getRequest = exports.createRequest = void 0;
const requests_model_1 = __importDefault(require("../models/requests.model"));
const qualifedUsers_models_1 = __importDefault(require("../models/qualifedUsers.models"));
const createRequest = (req, res) => {
    const request = new requests_model_1.default(req.body);
    request.status = "Waiting Response";
    request.save((err, request) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json({ message: "Solicitud creada" });
    });
};
exports.createRequest = createRequest;
const getRequest = (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    console.log(req.params.user + ":: " + new ObjectId(req.params.user));
    requests_model_1.default.findOne({ user: new ObjectId(req.params.user) }, (err, request) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!request) {
            return res.status(404).json("No hay ");
        }
        console.log(request);
        return res.status(200).json(request);
    });
};
exports.getRequest = getRequest;
const acceptRequest = (req, res) => {
    requests_model_1.default.findById(req.params.request, (err, request) => {
        if (request) {
            request.status = "Accepted";
            let qUser = new qualifedUsers_models_1.default();
            qUser.areas = request.areas;
            qUser.user = request.user;
            request.save();
            qUser.save();
            return res.status(200).json(qUser);
        }
    });
};
exports.acceptRequest = acceptRequest;
