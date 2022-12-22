import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";

export const verifyExistUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const idUser: string = req.params.id 
    const userRepository = AppDataSource.getRepository(User) 
    const existUser = await userRepository.exist({where: {id: idUser}})

    if(!existUser) {
        throw new AppError(404, "User not found")
    }

    return next()
}