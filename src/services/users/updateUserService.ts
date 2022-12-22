import { AppDataSource } from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";
import { iReturnUser, iUpdateUser } from "../../interfaces/usersInterface";
import { returnUserSchema } from "../../schemas/usersSchemas";

export const updateUserService = async (idUser: string, dataUpdate: iUpdateUser, userLogged: iReturnUser) => {
    
    const userRepository = AppDataSource.getRepository(User)

    if (!userLogged.is_adm) {
        if (!(userLogged.id == idUser)) {
            throw new AppError(401, "Permission admin required")
        }
    }

    if (dataUpdate.email) {
        const isEmailRegistered = await userRepository.exist({where: {email: dataUpdate.email}})
        
        if (isEmailRegistered) {
            throw new AppError(409, "Email already registered")
        }
    }

    const userSelected = await userRepository.findOneBy({id: idUser})
    const updatedUser = userRepository.create({...userSelected, ...dataUpdate})
    await userRepository.save(updatedUser)
    return await returnUserSchema.validate(updatedUser, {stripUnknown: true})
}