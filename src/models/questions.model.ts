import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})

const Question = mongoose.model("Question", questionSchema);
export default Question;