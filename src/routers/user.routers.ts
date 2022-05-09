import express from 'express';
import { login, registerNewUser, getUserNameByID } from '../controllers/users.controllers';

const Router = express.Router();

Router.post("/register", registerNewUser)
Router.post("/login", login)
Router.get("/getName/:id", getUserNameByID)

export default Router;