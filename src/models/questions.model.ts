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
    area:{
      type:String
    },
    designedUser:{
      type:mongoose.Schema.Types.ObjectId,
      required:false
    }
})

const Question = mongoose.model("Question", questionSchema);
export default Question;