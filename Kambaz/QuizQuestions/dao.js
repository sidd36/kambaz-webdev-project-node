import model from "./model.js";
import quizModel from "../Quizzes/model.js"
export function getQuestions() {
    return model.find();
}

export function findQuestionsForQuiz(inputQuizId) {
    return model.find({quizId: inputQuizId});
}

export async function createQuestion(question) {
    await quizModel.updateOne({ _id: question.quizId }, { $inc: { qns: 1 } });
    return await model.create(question);

}

export function deleteQuestion(questionId) {
    return model.deleteOne({_id: questionId});
}

export function updateQuestion(questionId, questionUpdates) {
    return model.updateOne({_id: questionId}, questionUpdates);
}