import { Handler } from 'express';
import { User } from '../model';

export const signUp: Handler = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const { id } = await User.signUp({ email, username, password })

        res.status(201).json({ id })
    } catch (error: any) {
        res.status(444).json({ message: error.message })
        throw new Error('Error de servidor - ' + error.message)
    }
}


export const login: Handler = async (req, res) => {
    try {
        const { email, password } = req.body
        const { success } = await User.login({ email, password })

        if (!success) return res.status(203).json({ error: 'Las credenciales son erroneas.' })

        res.status(200).json({ success })
    } catch (error: any) {
        res.status(444).json({ error: error.message })
        throw new Error('Error de servidor - ' + error.message)
    }
}