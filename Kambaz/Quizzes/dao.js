import model from "./model.js";

export function fetchQuizzes() {
    return model.find();
}