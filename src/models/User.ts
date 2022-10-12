import { v4 } from "uuid";
import { getConnection } from '../server/database';
import { UserProps } from '../interfaces/types';
import Roles from '../enum';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type CreateParams = Omit<UserProps, 'id' | 'roles'>

type Create = (params: CreateParams) => Promise<string>

type LoginParams = Omit<CreateParams, 'username'>

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

export const create: Create = async ({ username, email, password }) => {
    const newUser: UserProps = {
        id: v4(),
        username,
        email,
        password: await encrypt(password),
        roles: [Roles.USER]
    }

    await getConnection().get('users').push(newUser).write()

    return newUser.id
}


export const login: Login = async ({ email, password }) => {
    const db = await getConnection()
    const user: UserProps = await db.get('users').find({ email }).value()

    if (!user) return

    const match = await compare(password, user.password)

    if (!match) return

    const token = sign({ idUser: user.id })

    return { token }
}



export const usernameExists = async (username: string) => {
    const db = await getConnection()

    const user = await db.get('users').find({ username }).value()

    return !!user
}


export const emailExists = async (email: string) => {
    const db = await getConnection()

    const user = await db.get('users').find({ email }).value()

    return !!user
}

/* ----------  Metodos nuevos ................ */

export const findByID = async (id: string) => {
    const db = await getConnection();
    const user = await db.get('users').find({ id }).value()
    return user;
}

export const all = async () => {
    const db = await getConnection()
    const users = await db.get('users').value()
    return users
}

export const estimatedDocumentCount = async () => {
    const users = await all()
    return users.length
}





export const hasRole = async (userId: string, role: Roles) => {
    const user = await findByID(userId)
    return user.roles.includes(role)
}






type BlockFunction = (user: UserProps, aRole: Roles) => Array<Roles>
type ChangeRole = (userId: string, aRole: Roles, callback: BlockFunction) => Promise<boolean>

const changeRole: ChangeRole = async (userId, aRole, callback) => {
    const user = await getConnection().get('users').find({ id: userId }).value()

    if (!user) return false

    const roles = callback(user, aRole)

    await getConnection().get('users').find({ id: userId }).assign({ roles }).write()

    return true
}

export const addRole = async (userId: string, aRole: number) => {
    return changeRole(userId, aRole, (user, aRole) => [...user.roles, aRole])
}

export const popRole = async (userId: string, aRole: number) => {
    const callback: BlockFunction = (user, aRole) =>
        user.roles.filter(role => role != aRole)

    return changeRole(userId, aRole, callback)
}
