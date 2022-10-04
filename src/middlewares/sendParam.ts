import { Handler } from 'express';

/**
 * Envio de parametros a través del objeto req y res
 */
export const sendParam: Handler = (req, res, next) => {
    req.params.message = 'req.params: message enviado desde el middleware sendParam.'
    res.locals.method = {
        name: 'sendParam',
        drivenTo: 'res.locals',
        param: 'method',
        chapter: 10,
        active: true
    }
    next()
}