import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    _id: String,
    title: String,
    course: String,
    availableDt: String,
    availableTime: String,
    dueDt: String,
    dueTime: String,
    untilDt: String,
    untilTime: String,
    points: Number,
    desc: String
},
    { collection: "assignments" }
);
export default assignmentSchema;