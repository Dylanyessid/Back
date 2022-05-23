import { Request, Response } from "express"
import Question from '../models/questions.model';

export const createQuestion = (req:Request, res:Response) =>{
    
    const question = new Question(req.body);
    question.save((err:any, question:any)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json({message:"Pregunta creada"})
    })
    
}

export const getQuestions = async(req:Request,res:Response)=>{

     
     Question.find({},(err:any, questions:any)=>{

         if(err){
             return res.status(500).json(err);
         }

        return res.status(200).json(questions)
    });

}

export const getUserQuestions = (req:Request,res:Response)=>{
    
     Question.find({user:req.params.user},(err:any, questions:any)=>{

         if(err){
             return res.status(500).json(err);
         }
       

        return res.status(200).json(questions)
    });

}

export const getPrivateQuestions = (req:Request, res:Response)=>{
  Question.find({isPrivate:true},(err:any, questions:any)=>{

         if(err){
             return res.status(500).json(err);
         }
       

        return res.status(200).json(questions)
    });
}