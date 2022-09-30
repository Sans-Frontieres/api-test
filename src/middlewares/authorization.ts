import jwt from 'jsonwebtoken'
import { Handler } from 'express';

interface JwtPayload {
    idUser: string
}

const verify = (token: string) => jwt.verify(token, process.env.PUBLIC_KEY!) as JwtPayload

// Middleware encargado de verificar el token del user
export const verifyToken: Handler = async (req, res, next) => {
    try {
        const token = req.headers["Authorization"] as string;

        if (!token) return res.status(403).json({ message: "No posee un token válido." });

        const decoded = verify(token);

        req.params.idUser = decoded.idUser
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "No autorizado!" });
    }
};
