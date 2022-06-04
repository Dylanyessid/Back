import { Request, Response } from "express"
import Question from '../models/questions.model';


export const createQuestionWithFile = (req:Request, res:Response)=>{
  
  return res.status(200).json("Si")
}

export const createQuestion = (req:Request, res:Response) =>{
    
    const question = new Question(req.body);
  console.log(req.body);
  console.log(question);
    question.designedUser = null;
    question.save((err:any, question:any)=>{
        if(err){
          console.log(err)
            return res.status(500).json(err);
        }
        return res.status(200).json({message:"Pregunta creada"})
      
    })
    
}

export const getQuestion = (req:Request, res:Response) =>{
  Question.findById(req.params.question, (err:any, question:any)=>{
    return res.status(200).json(question)
  })
}

export const getQuestions = async(req:Request,res:Response)=>{

     
     Question.find({isPrivate:false},(err:any, questions:any)=>{

         if(err){
             return res.status(500).json(err);
         }

        return res.status(200).json(questions)
    });

}

export const getUserQuestions = (req:Request,res:Response)=>{
    
     Question.find({user:req.params.user, isPrivate:false},(err:any, questions:any)=>{

         if(err){
             return res.status(500).json(err);
         }
       

        return res.status(200).json(questions)
    });

}

export const getPrivateQuestions = (req:Request, res:Response)=>{
  Question.find({user:{$ne:req.params.user},isPrivate:true, designedUser:null, area:req.params.area},(err:any, questions:any)=>{

         if(err){
           
             return res.status(500).json(err);
         }
       

        return res.status(200).json(questions)
    });
}

export const getUserPrivateQuestions = (req:Request, res:Response)=>{
  Question.find({user:req.params.user,isPrivate:true},(err:any, questions:any)=>{

         if(err){
            console.log(err)
             return res.status(500).json(err);
         }
       

        return res.status(200).json(questions)
    });
}

export const getAssignedQuestions = (req:Request, res:Response)=>{
  Question.find({designedUser:req.params.user}, (err:any, questions:any)=>{
    if(err) return res.status(500).json(err)

    return res.status(200).json(questions)
  })
}