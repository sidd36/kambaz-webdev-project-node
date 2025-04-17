import * as quizzesDao from "./dao.js";
export default function QuizzesRoutes(app) {
    app.get("/api/quizzes", async(req, res) => {
        const quizzes = await quizzesDao.fetchQuizzes();
        res.json(quizzes);
    })
}