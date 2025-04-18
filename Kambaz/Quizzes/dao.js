import model from "./model.js";

export function fetchQuizzes() {
    return model.find();
}

export function deleteQuiz(id) {
    return model.deleteOne({_id: id});
}

export function updateQuiz(id, updatedQuiz) {
    return model.updateOne({_id: id}, updatedQuiz);
}