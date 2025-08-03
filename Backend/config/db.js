import mongoose from"mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://pranjalirasal1278:resume124@cluster0.qxvubmq.mongodb.net/?')
    .then(() => console.log('DB CONNCTED'))
}

