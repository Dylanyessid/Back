import { Request, response, Response } from "express";
import User from '../models/users.model';
import QualifiedUser from "../models/qualifedUsers.models"
import bcrypt from 'bcryptjs'

export const registerNewUser = async (req:Request, res:Response) =>{
    const data = (req.body)
    data.isQualified = false;
    data.password= await bcrypt.hash(req.body.password, 9)
    const newUser = new User(data);
    newUser.save((err:any, user:any)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json({_id:user._id,name: user.name,surname: user.surname, isQualified: user.isQualified})
    })
}

export const login = async(req:Request, res:Response)=>{
    
    User.findOne({email:req.body.email}, (err:any, user:any)=>{

         if(err){
                return res.status(500).json(err)
        }
        if(!user){
            return res.status(400).json("No encontado")
        }

       
        if(req.body.password=='' || user.password==null || req.body.email==''){
            return res.status(400).json({message:"Los campos enviados son NULOS."})
        }

        bcrypt.compare(req.body.password, user.password, (err:any,result:any)=>{
            
            if(err){
                return res.status(500).json(err)
            }
            
            if(result){
                
                return res.status(200).json({_id:user._id,name: user.name,surname: user.surname, isQualified: user.isQualified});
                
            }
            else{
                return res.status(401).json({message:"Autenticación fallida"});
            }
        })
        
    })
   
   
}

export const getUserNameByID = async(req:Request, res:Response) =>{
  
    let user = await User.findById(req.params.id)
    const qualifiedUser = await QualifiedUser.findOne({user:req.params.id});

  let data = user.toObject()
  let isQualified;
  if(qualifiedUser){
   data.isQualified = true
  }else{
     data.isQualified = false
  }


  return res.status(200).json(data)
  
}

