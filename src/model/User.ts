import { v4 } from "uuid";
import { getConnection } from '../server/db';
import { User } from '../interfaces/types';

type SignUpParams = Omit<User, 'id'>

type SignUp = (params: SignUpParams) => Promise<{ id: string }>

type LoginParams = Omit<SignUpParams, 'username'>

type Login = (params: LoginParams) => Promise<{ success: boolean }>

export const signUp: SignUp = async ({ username, email, password }) => {
    const newUser = {
        id: v4(),
        username,
        email,
        password
    }

    await getConnection().get('users').push(newUser).write()

    return { id: newUser.id }
}


export const login: Login = async ({ email, password }) => {
    const db = await getConnection()

    const user: User = await db.get('users').find({ email }).value()

    if (!user) return { success: false }

    if (user.password === password) return { success: true }

    return { success: false }
}


/**
 * Metodo para consultar la existencia de un user por username
 * @param username : string
 * @returns 
 */
export const usernameExists = async (username: string) => {
    const db = await getConnection()

    const user = await db.get('users').find({ username }).value()

    return user ? true : false
}

/**
 * Metodo para consultar la existencia de un user por email
 * @param email : string
 * @returns 
 */
export const emailExists = async (email: string) => {
    const db = await getConnection()

    const user = await db.get('users').find({ email }).value()

    return user ? true : false
}

