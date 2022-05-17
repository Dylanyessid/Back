import { Request, Response } from "express"
import Req from '../models/requests.model';

export const createRequest = (req:Request, res:Response) =>{
    
    const request = new Req(req.body);
    request.save((err:any, request:any)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json({message:"Solicitud creada"})
    })
    
}

export const getRequest = async(req:Request,res:Response)=>{

     Req.findById(req.params.user,(err:any, request:any)=>{

         if(err){
             return res.status(500).json(err);
         }

        return res.status(200).json(request)
    });

}
