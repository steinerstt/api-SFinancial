import { AppDataSource } from "../../data-source"
import { User } from "../../entities/usersEntity"
import { AppError } from "../../errors"
import { iReturnUser } from "../../interfaces/usersInterface"

export const deleteUserService = async (id: string, userLogged: iReturnUser) => {
    
    const userRepository = AppDataSource.getRepository(User)

    if (!userLogged.is_adm) {
        if (!(userLogged.id == id)) {
            throw new AppError(401, "Permission admin required")
        }
    }
    
    const user = await userRepository.findOneBy({id: id})
    await userRepository.remove(user)
    return {}
}