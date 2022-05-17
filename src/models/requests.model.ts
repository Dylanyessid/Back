import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    area:[{
        type:String,
        required:true,
    }],
    status:{
        type:String,
        required:true,
    }
})

const Request = mongoose.model("Request", requestSchema);
export default Request;