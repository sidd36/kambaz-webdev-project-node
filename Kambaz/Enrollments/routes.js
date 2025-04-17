import * as enrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments", async (req, res) => {
        const enrollments = await enrollmentsDao.getEnrollments();
        res.json(enrollments);
    })

    app.put("/api/enrollments", async (req, res) => {
        const enrollments = await enrollmentsDao.enrollUserInCourse(req.body.user, req.body.course);
        res.json(enrollments);
    })

    app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
        const {userId, courseId} = req.params;
        const enrollments = await enrollmentsDao.unEnrollUserFromCourse(userId, courseId);
        res.json(enrollments);
    })
}