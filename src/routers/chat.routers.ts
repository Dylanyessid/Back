import express from 'express';
import { sendNewMessage } from '../controllers/chat.controllers';
const Router = express.Router();

Router.post("/sendMessageTo/:id", sendNewMessage)

export default Router;