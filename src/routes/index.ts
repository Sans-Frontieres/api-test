import tasksRouter from "./tasks.routes";
import authRouter from "./auth.routes";
import usersRouter from "./users.routes"

const enum Paths {
    ROOT = '/api/v1',
    DOCS = '/api/v1/docs',
    TASKS = '/api/v1/tasks',
    AUTH = '/api/v1/auth',
    USERS = '/api/v1/users',
}

export {
    Paths,
    tasksRouter,
    authRouter,
    usersRouter
}