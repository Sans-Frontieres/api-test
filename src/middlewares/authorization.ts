import jwt from 'jsonwebtoken'
import { Handler } from 'express';
// import path from "path";
// import fs from "fs";

// const cert = fs.readFileSync(path.join(process.env.HOME!, "./certificates/node_api.pub.pem"));

interface JwtPayload {
    idUser: string
}

const verify = (token: string) => jwt.verify(token, process.env.PUBLIC_KEY!) as JwtPayload

// Middleware encargado de verificar el token del user
export const verifyToken: Handler = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization as string;

        if (!authorization) return res.status(403).json({ message: "No posee un token válido." });

        const token = authorization.split('Bearer ').pop()

        const decoded = verify(token!);

        req.params.idUser = decoded.idUser
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "No autorizado!" });
    }
};
