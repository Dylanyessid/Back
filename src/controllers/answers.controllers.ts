import {Request, Response} from 'express';
import Answer from '../models/answers.model';
import Question from '../models/questions.model';

export const createAnswer = async(req:Request, res:Response)=>{
    const data = (req.body)
    const newAnswer = new Answer(data);
    newAnswer.score = 0;

    const question =  await Question.findById(data.question)
    if(!question){
        return res.status(400).json("No encontrado")
    }
    
  
    newAnswer.save((err:any, answer:any)=>{
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(answer)
    });
    
}

export const getAnswersOfQuestion = (req:Request, res:Response) =>{
    
    Answer.find({question:req.params.questionId}, (err:any, answers:any) =>{
        
       
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(answers)
    })
}

export const qualifyAnswer = (req:Request, res:Response)=>{
    
    const punctuation = req.body.punctuation;

    
    Answer.findById(req.params.answerId, (err:any, answer:any) =>{
    
        punctuation ? answer.score++ : answer.score--;
        answer.save();
        return res.status(200).json({message:"Respuesta puntuada con éxito."})
    })
}