import model from "./model.js";
import mongoose from "mongoose";
import questionModel from "../QuizQuestions/model.js";

export async function fetchQuizResponseForStudent(quiz_id, user_id) {
    
    try {
        const response = await model.findOne({
          quiz_id: quiz_id,
          user_id: user_id
        })
        if (!response) {
            return {
              quiz_id,
              user_id,
              answers: [],
              score: 0,
              submitted_on: null,
              attempts: 0
            };
          }
        console.log ("response = ", response)
        return response;
      } catch (err) {
        console.error("Error fetching quiz response:", err);
        return("error in getting response")
      }
}

export async function saveQuizResponse(quizResponse) {
    console.log(quizResponse);

    let quiz_response = {
        quiz_id: quizResponse.quiz_id,
        user_id: quizResponse.user_id,
        answers: quizResponse.answers.map(ans => ({
            ...ans,
            question_id: ans.question_id
        }))
    };

    const questionIds = quiz_response.answers.map(a => a.question_id);
    const questions = await questionModel.find({ _id: { $in: questionIds } });

    const questionMap = {};
    questions.forEach(q => {
        questionMap[q._id] = q;
    });

    let totalScore = 0;

    quiz_response.answers = quiz_response.answers.map(ans => {
        const q = questionMap[ans.question_id];
        let isCorrect = false;

        if (!q) return { ...ans, is_correct: false };

        switch (q.type) {
            case "true_false":
                isCorrect = String(ans.selected_option).toLowerCase() === String(q.answer_boolean).toLowerCase();
                break;

            case "fill_the_blank":
                isCorrect = q.answer_blanks.some(blank =>
                    blank.trim().toLowerCase() === ans.selected_option.trim().toLowerCase()
                );
                break;

            case "multiple_choice":
                // Implement this if needed
                case "multiple_choice":
                const correctChoice = q.multiple_choices.find(choice => choice.isCorrect);
                isCorrect = correctChoice?.text?.toLowerCase() === ans.selected_option?.toLowerCase();
                break;

            default:
                break;
        }

        if (isCorrect) totalScore += q.points || 0;

        return {
            ...ans,
            is_correct: isCorrect
        };
    });

    quiz_response.score = totalScore;
    quiz_response.submitted_on = new Date();
    quiz_response.updated_at = new Date();

    // Check for existing document
    const existingResponse = await model.findOne({
        quiz_id: quiz_response.quiz_id,
        user_id: quiz_response.user_id
    });

    if (existingResponse) {
        // Update existing record and increment attempts
        existingResponse.answers = quiz_response.answers;
        existingResponse.score = quiz_response.score;
        existingResponse.submitted_on = quiz_response.submitted_on;
        existingResponse.updated_at = quiz_response.updated_at;
        existingResponse.attempts = (existingResponse.attempts || 1) + 1;

        return existingResponse.save();
    } else {
        // Create new document
        quiz_response.attempts = 1;
        return model.create(quiz_response);
    }
}
