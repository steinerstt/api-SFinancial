import * as jwt from "jsonwebtoken"
import { compare } from "bcrypt"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/usersEntity"
import { AppError } from "../../errors"
import { returnUserSchema } from "../../schemas/usersSchemas"
import "dotenv/config"

export const activateAccountService = async (idUser: string, passwordUser: string) => {

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({id: idUser})

    const passwordMatch = await compare(passwordUser, user.password)
    if (!passwordMatch) {
        throw new AppError(409, "Password invalid")
    }

    await userRepository.update({id: idUser}, {is_active: true})
    user.is_active = true

    const token = jwt.sign({email: user.email}, process.env.SECRET_KEY, {subject: user.id, expiresIn: "48h"})
    const returnUser = await returnUserSchema.validate(user, {stripUnknown: true})

    const dataUser = {
        token: token,
        user: returnUser
    }
    return dataUser
}