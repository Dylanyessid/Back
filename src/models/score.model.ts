import mongoose from 'mongoose';

const score = new mongoose.Schema({
    answer:{
      type: mongoose.Schema.Types.ObjectId,
      required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    isPositive:{
        type: Boolean,
        required:true
    }
})

const Score = mongoose.model("Score", score);
export default Score;