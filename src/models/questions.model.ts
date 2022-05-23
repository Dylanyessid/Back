import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isPrivate:{
      type:Boolean,
      required:true
    },
    areas:[{
      type:String
    }],
    fileUri:{
      type:String,
      required:false
    }
})

const Question = mongoose.model("Question", questionSchema);
export default Question;