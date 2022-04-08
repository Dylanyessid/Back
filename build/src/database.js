"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URI = "mongodb+srv://Dylanyessid:WtBOiOYd6Wh1DmFV@clusterdylan.yjpzm.mongodb.net/AcaHelp?retryWrites=true&w=majority";
const dbConnect = () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };
    mongoose_1.default.connect(URI);
    const mongooseConnect = mongoose_1.default.connection;
    mongooseConnect.once("open", () => {
        console.log("datebase connect");
    });
};
exports.dbConnect = dbConnect;
