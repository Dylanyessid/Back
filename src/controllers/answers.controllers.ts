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

      console.log(answers)
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
  Answer.findById(req.params.answerId, (err: any, qAnswer: any) => {
    const ObjectId = require('mongoose').Types.ObjectId
    if (qAnswer) {
      const data = { answer: new ObjectId(req.params.answerId), user: new ObjectId(req.body.user), isPositive: req.body.isPositive }

      Score.findOne({ answer: req.params.answerId, user: req.body.user }, (err: any, score: any) => {
        if (!score) {
          let score = new Score(data);
          score.save()
          Score.countDocuments({ answer: req.params.answer, isPositive: true }, (err: any, countP: any) => {
            Score.countDocuments({ answer: req.params.answer, isPositive: false }, (err: any, countN: any) => {
              qAnswer.score = countP - countN;
              qAnswer.save();
              return res.status(200).json(score);
            })
          })
        }
        if (score) {
          if (score.isPositive == data.isPositive) {
            return res.status(400).json({ message: "Ya has  indicado que te gusta la respuesta" })
          } else {
            Score.findOneAndUpdate({ answer: req.params.answerId, user: req.body.user }, { isPositive: data.isPositive }, [], (err: any, score: any) => {
              if (err) {
                return res.status(500).json(err)
              }
              return res.status(200).json({ message: "Actalizado puntaje correctamente" })
            })
          };
        }
      })
    }
  })
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
  console.log({ negatives, positives })
  res.status(200).json({ negatives, positives })


}