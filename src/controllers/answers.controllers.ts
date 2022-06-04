import { Request, Response } from 'express';
import Answer from '../models/answers.model';
import Question from '../models/questions.model';
import Score from '../models/score.model'

export const createAnswer = async (req: Request, res: Response) => {
  const data = (req.body)
  const newAnswer = new Answer(data);
  newAnswer.score = 0;
  const question = await Question.findById(data.question)
  if (!question) {
    return res.status(400).json("No encontrado")
  }
  newAnswer.save((err: any, answer: any) => {
    if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).json(answer)
  });

}

export const getAnswersOfQuestion = (req: Request, res: Response) => {

  Answer.find({ question: req.params.questionId }, null, { sort: { score: -1 } }, (err: any, answers: any) => {


    if (err) {
      return res.status(500).json(err)
    }
    if (answers) {
     
      return res.status(200).json(answers)

    }

  })
}


export const getUserAnswers = async (req: Request, res: Response) => {

  Answer.find({ user: req.params.user }, (err: any, answers: any) => {

    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(answers)
  });

}

export const addScore = async (req: Request, res: Response) => {
  const ObjectId = require('mongoose').Types.ObjectId
 const qAnswer = await Answer.findById(req.params.answerId)
    if (qAnswer) {
      const data = { answer: new ObjectId(req.params.answerId), user: new ObjectId(req.body.user), isPositive: req.body.isPositive }

    const previousScore = await Score.findOne({ answer: req.params.answerId, user: req.body.user})
        if (!previousScore) {
          let score = new Score(data);
          await score.save();
          const cP = await Score.countDocuments({answer:req.params.answerId, isPositive:true})
          const cN = await Score.countDocuments({answer:req.params.answerId, isPositive:false})
          qAnswer.score = cP - cN;
          await qAnswer.save()
         return res.status(200).json(qAnswer)
        }
      
        if (previousScore) {
          if (previousScore.isPositive == data.isPositive) {
            return res.status(400).json({ message: "Ya has  indicado que te gusta la respuesta" })
          } else {
            Score.findOneAndUpdate({ answer: req.params.answerId, user: req.body.user }, { isPositive: data.isPositive }, [], (err: any, score: any) => {
              if (err) {
                return res.status(500).json(err)
              }
              Score.countDocuments({ answer: req.params.answer, isPositive: true }, (err: any, countP: any)=>{
                Score.countDocuments({ answer: req.params.answer, isPositive: false }, (err: any, countN: any)=>{
                  qAnswer.score = countP-countN;
                  qAnswer.save()
                  return res.status(200).json({ message: "Actalizado puntaje correctamente" })
                })
              })
            })
          };
        }
      
    }
  
}

export const removeScore = async (req: Request, res: Response) => {
  Score.findOneAndRemove({ answer: req.params.answerId, user: req.params.user }, (err: any, score: any) => {
    if (err) {
      return res.status(500).json(err)
    }
    Answer.findById(req.params.answerId, (err: any, qAnswer: any) => {

      if (err) {
        return res.status(500).json(err)
      }

      Score.countDocuments({ answer: req.params.answer, isPositive: true }, (err: any, countP: any) => {
        Score.countDocuments({ answer: req.params.answer, isPositive: false }, (err: any, countN: any) => {
          console.log(countP)
          qAnswer.score = countP - countN;
          qAnswer.save();
          return res.status(200).json(score);
        })

      })
    })
  })
}

export const getScores = async (req: Request, res: Response) => {
  Score.find({ question: req.params.question, user: req.params.user }, (err: any, scores: any) => {
    return res.status(200).json(scores);
  })
}

export const getScore = async (req: Request, res: Response) => {
  let positives = 0;
  let negatives = 0;
  let t = await Score.countDocuments({ answer: req.params.answer, isPositive: true })

  let p =
    await Score.countDocuments({ answer: req.params.answer, isPositive: false })

  positives = t;
  negatives = p;

  res.status(200).json({ negatives, positives })
}

export const responsePrivateAnswer = async(req:Request, res:Response)=>{


  try{
    const answers = await Answer.find({question:req.params.question});
    if(answers.length == 0){
    const question = await Question.findById(req.params.question)
    question.designedUser = req.params.user;
      
    await question.save()
  }

  const data = (req.body)
  const newAnswer = new Answer(data);
  newAnswer.score = 0;
  await newAnswer.save()

  return res.status(200).json(newAnswer)
  }catch (err){
    return res.status(404).json(err)
  }
  
  
}