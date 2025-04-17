import model from "./model.js";

export function getEnrollments() {
    return model.find();
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
}

export function unEnrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course })
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

