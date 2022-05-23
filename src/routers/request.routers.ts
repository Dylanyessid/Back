import express from 'express';
import {createRequest, getRequest, acceptRequest} from '../controllers/requests.controllers'


const Router = express.Router();

Router.post("/createNewRequest", createRequest);
Router.get("/getRequest/:user", getRequest);
Router.put("/acceptRequest/:request",acceptRequest )

export default Router;