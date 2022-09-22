import { Handler } from 'express'
import { taskSchema } from '../../schemas'

export const create: Handler = (req, res, next) => {
    const { error } = taskSchema.create.validate(req.body);
    error ? res.status(422).json({ error: error.details[0].message }) : next()
}

export const update: Handler = (req, res, next) => {
    const { error } = taskSchema.update.validate(req.body);
    error ? res.status(422).json({ error: error.details[0].message }) : next()
}