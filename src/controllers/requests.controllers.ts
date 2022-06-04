import { Request, Response } from "express"
import mongoose from "mongoose";
import Req from '../models/requests.model';
import QualifiedUser from '../models/qualifedUsers.models'

export const createRequest = (req:Request, res:Response) =>{
    
    const request = new Req(req.body);
    request.status = "Waiting Response"
    request.save((err:any, request:any)=>{
        if(err){
          console.log(err)
            return res.status(500).json(err);
        }
        return res.status(200).json({message:"Solicitud creada"})
    })
    
}

export const getRequest = (req:Request,res:Response)=>{

  
  const ObjectId = require('mongoose').Types.ObjectId
     Req.findOne({user:new ObjectId(req.params.user) },(err:any, request:any)=>{

         if(err){
             return res.status(500).json(err);
         }

        if(!request){
          return res.status(404).json("No hay ")
        }

       
        return res.status(200).json(request)
    });

}

export const  acceptRequest = (req:Request, res:Response)=>{
  Req.findById(req.params.request, (err:any, request:any)=>{

    if(request){
      request.status = "Accepted";
     
      let qUser = new QualifiedUser()
      qUser.areas = request.areas;
      qUser.user = request.user;
      request.save();
      qUser.save();
      return res.status(200).json(qUser)
    }
  })
}
