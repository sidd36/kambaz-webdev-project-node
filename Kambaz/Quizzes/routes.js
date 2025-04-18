import * as quizzesDao from "./dao.js";
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
}