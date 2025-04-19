import model from "./model.js";

export function getQuestions() {
    return model.find();
}

export function findQuestionsForQuiz(inputQuizId) {
    return model.find({quizId: inputQuizId});
}

export function createQuestion(question) {
    return model.create(question);
}

export function deleteQuestion(questionId) {
    return model.deleteOne({_id: questionId});
}

export function updateQuestion(questionId, questionUpdates) {
    return model.updateOne({_id: questionId}, questionUpdates);
}