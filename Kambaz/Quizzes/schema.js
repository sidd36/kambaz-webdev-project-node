import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    _id: String,
    title: String,
    course: String,
    status: String,
    dueDt: String,
    dueTime: String,
    points: Number,
    qns: Number
},
    { collection: "quizzes" }
);
export default quizSchema;