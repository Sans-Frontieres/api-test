import tasksRouter from "./tasks.routes";
import authRouter from "./auth.routes";

const enum Paths {
    ROOT = '/api/v1',
    DOCS = '/api/v1/docs',
    TASKS = '/api/v1/tasks',
    AUTH = '/api/v1/auth',
}

export {
    Paths,
    tasksRouter,
    authRouter
}