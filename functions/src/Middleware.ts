import express from 'express'
import {HttpException} from './HttpException'


export function errorMiddleware(
    error: HttpException,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    const status = error.status || 500;
    const message = [error.message] || ['Something went wrong...']

    res.status(status).json({message, status})
    next()
}