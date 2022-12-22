import { NextFunction, Request, Response } from "express"

export class AppError extends Error {
    statusCode: number
    constructor (statusCode: number, message: string) {
        super()
        this.statusCode = statusCode,
        this.message = message
    }
}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({message: err.message})
    }


    console.error(err);
    return res.status(500).json({message: "Internal server error"})
}