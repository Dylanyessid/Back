import express from 'express';
import {createRequest, getRequest} from '../controllers/requests.controllers'


const Router = express.Router();

Router.post("/createNewRequest", createRequest);
Router.get("/getRequest/:user", getRequest);


export default Router;