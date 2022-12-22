import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";
import { iLoginRequest } from "../../interfaces/loginInterfaces";
import { returnUserSchema } from "../../schemas/usersSchemas";
import "dotenv/config"

export const loginService = async (dataLogin: iLoginRequest) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({email: dataLogin.email})
    
    if (!user) {
        throw new AppError(401, "Email or password invalid")
    }

    const matchPassowrd = await compare(dataLogin.password, user.password)

    if (!matchPassowrd) {
        throw new AppError(401, "Email or password invalid")
    }

    if (!user.is_active) {
        const userDeactivated = {
            message: "User account deactivated",
            user: {
                id: user.id,
                name: user.name,
            }
        }
        
        return [401, userDeactivated]
    }

    const token = jwt.sign({email: user.email}, process.env.SECRET_KEY, {subject: user.id, expiresIn: "48h"})

    const returnUser = await returnUserSchema.validate(user, {stripUnknown: true})
    const dataUserLogin = {
        token: token,
        user: {
            ...returnUser
        }
    }

    return [200, dataUserLogin]
}