import { Request, Response } from "express";
import Chat from '../models/chat.model';

export const sendNewMessage = (req:Request, res:Response) =>{
    const message = {
        sender: req.body.sender,
        destiny: req.params.id,
        message: req.body.message
    }

    const chat = new Chat(message);

    chat.save((err:any, chat:any)=>{
        if(!chat){
            return res.status(400).json(err)
        }
        if(err){
            return res.status(500)
        }
        return res.status(200).json(message);
    });

}