import { Handler } from "express";
import { User } from '../model';

// verifica que el username y/o email no se duplique
export const uniqueEmail: Handler = async (req, res, next) => {
    const { username, email } = req.body;

    const user = await User.usernameExists(username)

    if (user)
        return res.status(400).json({ error: "El username ya existe." });

    const emailUser = await User.emailExists(email)

    if (emailUser)
        return res.status(400).json({ error: "El email ya existe." });

    next();
};