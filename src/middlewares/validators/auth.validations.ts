import { Handler } from 'express'
import { authSchema } from '../../schemas'

export const signUp: Handler = (req, res, next) => {
    const { error } = authSchema.signUp.validate(req.body);
    error ? res.status(422).json({ error: error.details[0].message }) : next()
}

export const login: Handler = (req, res, next) => {
    const { error } = authSchema.login.validate(req.body);
    error ? res.status(422).json({ error: error.details[0].message }) : next()
}