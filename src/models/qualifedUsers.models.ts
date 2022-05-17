import mongoose from 'mongoose';

const qualifiedUser = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    areas:[{
      type:String,
    }]
  
})

const QualifiedUser = mongoose.model("QualifiedUser", qualifiedUser);
export default QualifiedUser;