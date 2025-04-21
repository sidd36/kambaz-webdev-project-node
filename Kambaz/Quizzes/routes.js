import * as quizzesDao from "./dao.js";
import * as questionsDao from "../QuizQuestions/dao.js";
import * as quizResponsesDao from "../QuizResponses/dao.js"

export default function QuizzesRoutes(app) {
    app.get("/api/quizzes", async(req, res) => {
        const quizzes = await quizzesDao.fetchQuizzes();
        res.json(quizzes);
    })

    app.delete("/api/quizzes/:id", async(req, res) => {
        const { id } = req.params;
        const status = await quizzesDao.deleteQuiz(id);
        res.send(status);
    })

    app.put("/api/quizzes/:id", async(req, res) => {
        const { id } = req.params;
        const updatedQuiz = req.body;
        const result = await quizzesDao.updateQuiz(id, updatedQuiz);
        res.send(result);
    })

    app.post("/api/quizzes", async(req, res) => {
        const quiz = req.body;
        const result = await quizzesDao.addQuiz(quiz);
        res.send(result);
    })
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const modules = await questionsDao.findQuestionsForQuiz(quizId);
        res.json(modules);
    });

    app.post("/api/quizzes/:inputQuizId/questions", async (req, res) => {
        const { inputQuizId } = req.params;
        const question = {
            ...req.body,
            quizId: inputQuizId,
        };
        const newQuestion = await questionsDao.createQuestion(question);
        res.send(newQuestion);
    });

    app.post("/api/quizzes/:inputQuizId/responses", async (req, res) => {
        const { inputQuizId } = req.params;
        const response = req.body;
        const newResponse = await quizResponsesDao.saveQuizResponse(response);
        res.send(newResponse);
    });

    app.get("/api/quizzes/:quizId/responses/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        const responses = await quizResponsesDao.fetchQuizResponseForStudent(quizId, userId);
        res.json(responses);
    });
}