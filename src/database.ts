import mongoose from 'mongoose'

const URI = "mongodb+srv://Dylanyessid:WtBOiOYd6Wh1DmFV@clusterdylan.yjpzm.mongodb.net/AcaHelp?retryWrites=true&w=majority"

 const dbConnect = () =>{

    const options = {
        useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
     
    }
     mongoose.connect(URI)
          

    const mongooseConnect = mongoose.connection;

     mongooseConnect.once("open", () => {
      console.log("datebase connect");
    });
}

export {dbConnect};