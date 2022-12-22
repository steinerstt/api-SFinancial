import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

export const verifyUserIsAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userLogged = req.userLogged
    
    if (!userLogged.is_adm) {
        throw new AppError(401, "Permission admin required")
    }

    return next()
}