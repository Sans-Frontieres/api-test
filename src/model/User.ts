import { v4 } from "uuid";
import { getConnection } from '../server/db';
import { User } from '../interfaces/types';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import path from "path";
// import fs from "fs";

// import private and public key
// const key = fs.readFileSync(path.join(process.env.HOME!, "./certificates/node_api.pem"));


type SignUpParams = Omit<User, 'id'>

type SignUp = (params: SignUpParams) => Promise<{ id: string }>

type LoginParams = Omit<SignUpParams, 'username'>

type Login = (params: LoginParams) => Promise<{ token: string } | undefined>


const encrypt = async (password: string) => {
    const salt = await bcrypt.genSalt(5)
    return await bcrypt.hash(password, salt)
}


const compare = async (password: string, hashPassword: string) => await bcrypt.compare(password, hashPassword)


const sign = (payload: { idUser: string }) => {
    return jwt.sign(
        payload,
        process.env.PRIVATE_KEY!,
        { expiresIn: "5m", algorithm: "RS256" })
}

export const signUp: SignUp = async ({ username, email, password }) => {
    const newUser = {
        id: v4(),
        username,
        email,
        password: await encrypt(password)
    }

    await getConnection().get('users').push(newUser).write()

    return { id: newUser.id }
}


export const login: Login = async ({ email, password }) => {
    const db = await getConnection()
    const user: User = await db.get('users').find({ email }).value()

    if (!user) return

    const match = await compare(password, user.password)

    if (!match) return

    const token = sign({ idUser: user.id })

    return { token }
}



export const usernameExists = async (username: string) => {
    const db = await getConnection()

    const user = await db.get('users').find({ username }).value()

    // return user ? true : false // remplazamos por la forma corta
    return !!user
}


export const emailExists = async (email: string) => {
    const db = await getConnection()

    const user = await db.get('users').find({ email }).value()

    return !!user
}

