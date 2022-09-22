import { Handler } from "express";

export const signup: Handler = async (req, res) => {
    try {
        const { username, email, password } = req.body

        console.log('Property: ', username)

        res.status(201).json({ id: 'id' })

    } catch (error) {
        console.log('Error', error);
        res.status(444).send('Error en el server...')
    }
}

export const login: Handler = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log('Property: ', email)

        res.status(201).json({ id: 'id' })

    } catch (error) {
        console.log('Error', error);
        res.status(444).send('Error en el server...')
    }
}