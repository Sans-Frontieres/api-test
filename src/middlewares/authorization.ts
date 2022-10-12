import jwt from 'jsonwebtoken'
import { Handler, Request, Response, NextFunction } from 'express';
import { Task, User } from '../models';
import Roles from '../enum';

type BlockCanDoAction = (req: Request) => Promise<any>

type CanDoAction = (req: Request, res: Response, next: NextFunction, callback: BlockCanDoAction) => Promise<any>

interface JwtPayload {
    idUser: string
}

const verify = (token: string) => jwt.verify(token, process.env.PUBLIC_KEY!) as JwtPayload


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


const doAction: CanDoAction = async (req, res, next, callback) => {
    try {
        const canDoAction = await callback(req)

        if (!canDoAction) return res.status(403).json({ message: 'No posee los privilegios.' })

        next()
    } catch (error) {
        return res.status(401).json({ message: "No autorizado!" });
    }
}


export const isModerator: Handler = async (req, res, next) => {
    doAction(req, res, next, async (req) => {
        const userId = req.params.idUser
        return await User.hasRole(userId, Roles.MODERATOR)
    })
}

export const isAdmin: Handler = async (req, res, next) => {
    doAction(req, res, next, async (req) => {
        const userId = req.params.idUser
        return await User.hasRole(userId, Roles.MODERATOR)
    })
}

export const isAuthor: Handler = async (req, res, next) => {
    doAction(req, res, next, async (req) => {
        const userId = req.params.idUser
        const taskId = req.params.id
        return await Task.isAuthor(userId, taskId)
    })
}



export const isAdminOrModerator: Handler = async (req, res, next) => {
    doAction(req, res, next, async (req) => {
        const userId = req.params.idUser
        return await User.hasRole(userId, Roles.ADMIN)
            || await User.hasRole(userId, Roles.MODERATOR)
    })
}


export const hasPrivileges: Handler = async (req, res, next) => {
    doAction(req, res, next, async (req) => {
        const userId = req.params.idUser
        const taskId = req.params.id

        return await Task.isAuthor(userId, taskId)
            || await User.hasRole(userId, Roles.ADMIN)
            || await User.hasRole(userId, Roles.MODERATOR)
    })
}