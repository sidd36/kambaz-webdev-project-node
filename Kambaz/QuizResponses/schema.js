import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    question_id: { type: String, ref: "questions", required: true },
    selected_option: { type: String, required: true },
    is_correct: { type: Boolean, required: true } 
  });

const quizResponsesSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    quiz_id: { type: String, ref: "quizzes", required: true },
    user_id: { type: String, ref: "users", required: true },
    answers: [AnswerSchema],
    score: { type: Number, default:0,required: true },
    submitted_on: { type: Date, default: Date.now },
    attempts: { type: Number, default:1,required: true },
    },
    { collection: "quiz_responses" }
);
export default quizResponsesSchema;