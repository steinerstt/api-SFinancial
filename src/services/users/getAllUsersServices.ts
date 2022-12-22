import { AppDataSource } from "../../data-source"
import { User } from "../../entities/usersEntity"
import { returnAllUsersSchema } from "../../schemas/usersSchemas"

export const getAllUsersService =  async () => {
    const userRepository = AppDataSource.getRepository(User)
    const allUsers = await userRepository.find()

    return await returnAllUsersSchema.validate(allUsers, {stripUnknown: true})
}