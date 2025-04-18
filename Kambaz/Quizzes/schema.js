import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    _id: String,
    title: String,
    course: String,
    type: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Project"],
        default: "Quizzes"
    },
    shuffleAns: {
        type: Boolean,
        default: true
    },
    timeLimit: {
        type: Number,
        default: 20
    },
    multipleAttempts: {
        type: Boolean,
        default: false
    },
    noOfAttempts: {
        type: Number,
        default: 1
    },
    showCorrectAns: String,
    accessCode: {
        type: String,
        default: ""
    },
    oneQn: {
        type: Boolean,
        default: true
    },
    webcam: {
        type: Boolean,
        default: false
    },
    lockQns: {
        type: Boolean,
        default: false
    },
    dueDt: String,
    dueTime: String,
    availableDt: String,
    availableTime: String,
    untilDt: String,
    untilTime: String,
    points: Number,
    qns: Number,
    published: {
        type: Boolean,
        default: false
    }
},
    { collection: "quizzes" }
);
export default quizSchema;