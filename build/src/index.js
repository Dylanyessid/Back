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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_routers_1 = __importDefault(require("./routers/user.routers"));
const questions_routers_1 = __importDefault(require("./routers/questions.routers"));
const answers_routers_1 = __importDefault(require("./routers/answers.routers"));
const chat_routers_1 = __importDefault(require("./routers/chat.routers"));
const request_routers_1 = __importDefault(require("./routers/request.routers"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const PORT = 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        console.log("Connected in port: " + PORT);
        try {
            (0, database_1.dbConnect)();
        }
        catch (_a) {
            console.log("ERROR");
        }
    });
});
main();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/requests", request_routers_1.default);
app.use("/chats", chat_routers_1.default);
app.use("/users", user_routers_1.default);
app.use("/questions", questions_routers_1.default),
    app.use("/answers", answers_routers_1.default);
