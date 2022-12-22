import { AppDataSource } from "../../data-source"
import { User } from "../../entities/usersEntity"
import { AppError } from "../../errors"
import { iReturnUser } from "../../interfaces/usersInterface"

export const deactivateAccountService = async (idUser: string, userLogged: iReturnUser) => {
    const userRepository = AppDataSource.getRepository(User)

    if (!userLogged.is_adm) {
        if (!(userLogged.id == idUser)) {
            throw new AppError(409, "Permission admin required")
        }
    }

    await userRepository.update({id: idUser}, {is_active: false})
    return {message: "User account deactivated"}
}