import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    destiny:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
     message:{
        type:String,
        required:true,
       
    },
    },{
        timestamps:true
    }
    )

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;