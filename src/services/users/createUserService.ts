import { AppDataSource } from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";
import { iCreateUserRequest } from "../../interfaces/usersInterface";
import { returnUserSchema } from "../../schemas/usersSchemas";

export const createUserService = async (dataUser: iCreateUserRequest) => {

    const userRepository = AppDataSource.getRepository(User)

    const isEmailRegistered = await userRepository.exist({where: {email: dataUser.email}})
    if (isEmailRegistered) {
        throw new AppError(409, "Email already registered")
    }

    const newUser = userRepository.create(dataUser)
    await userRepository.save(newUser)

    return await returnUserSchema.validate(newUser, {stripUnknown: true})
}