import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false }
}, { _id: false });

const quizQuestionSchema = new mongoose.Schema({
    _id: String,
    quizId: { type: String, ref: "quizzes", required: true },

    type: {
        type: String, enum: ["multiple_choice", "true_false", "fill_the_blank"],
        required: true, default: "multiple_choice"
    },

    title: { type: String, required: true },
    question: { type: String, required: true },
    points: { type: Number, default: 0 },

    multiple_choices: {
        type: [choiceSchema],
        default: undefined
    },

    answer_boolean: {
        type: Boolean,
        required: function () {
            return this.type === "true_false";
        }
    },

    answer_blanks: {
        type: [String], trim: true,default: undefined,
        required: function () {
            return this.type === "fill_the_blank";
        }
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
    { collection: "questions" }
);

quizQuestionSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default quizQuestionSchema;
