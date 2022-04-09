import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "questions"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    answer:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required: true
    }
})

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;