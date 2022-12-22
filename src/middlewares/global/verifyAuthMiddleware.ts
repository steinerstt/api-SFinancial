import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import * as jwt from "jsonwebtoken"
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/usersEntity";

const handleGetUserById = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User)
    return await userRepository.findOneBy({id: id})
}


export const verifyAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization

    if (!authToken) {
        throw new AppError(401, "Authorization token required")
    }

    const token = authToken.split(" ")[1]

    return jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            throw new AppError(401, err.message)
        }
  
        const userLogged = await handleGetUserById(String(decoded.sub))

        req.userLogged = userLogged
        return next()        
    })
}