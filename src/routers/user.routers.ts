import express from 'express';
import { login, registerNewUser } from '../controllers/users.controllers';

const Router = express.Router();

Router.post("/register", registerNewUser)
Router.post("/login", login)

export default Router;