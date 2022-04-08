import { Request, response, Response } from "express";
import User from '../models/users.model';
import bcrypt from 'bcryptjs'

export const registerNewUser = async (req:Request, res:Response) =>{
    const data = (req.body)
    data.password= await bcrypt.hash(req.body.password, 9)
    const newUser = new User(data);
    newUser.save((err:any, user:any)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(user)
    })
}

export const login = async(req:Request, res:Response)=>{
    const userLog = User.findOne({email:req.body.email}, (err:any, user:any)=>{
        bcrypt.compare(req.body.password,user.password, (err:any,result:any)=>{
            if(result){
                console.log("pasó")
                return res.status(200).json({messgae:"Autenticación extiosa"});
                
            }
            else{
                return res.status(401).json({message:"Autenticación fallida"});
            }
        })
        
    })
   
   // 
}