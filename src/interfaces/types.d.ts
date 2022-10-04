import Roles from "../enum"

export interface Task {
    id: string,
    title: string,
    description: string
}

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    roles: Roles[]
}