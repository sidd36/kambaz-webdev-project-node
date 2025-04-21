import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizResponsesModel", schema);
export default model;