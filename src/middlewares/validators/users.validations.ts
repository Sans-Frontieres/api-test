import { Handler } from 'express';
import { userSchema } from '../../schemas'

export const changeRole: Handler = (req, res, next) => {
    const { error } = userSchema.changeRole.validate(req.body);
    error ? res.status(422).json({ error: error.details[0].message }) : next();
};
