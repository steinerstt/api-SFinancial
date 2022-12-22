import { Request, Response } from "express";
import { iCreateUserRequest, iReturnUser, iUpdateUser } from "../interfaces/usersInterface";
import { activateAccountService } from "../services/users/activateAccountService";
import { createUserService } from "../services/users/createUserService";
import { deactivateAccountService } from "../services/users/deactivateAccountService";
import { deleteUserService } from "../services/users/deleteUserService";
import { getAllUsersService } from "../services/users/getAllUsersServices";
import { updateUserService } from "../services/users/updateUserService";

export const createUserController = async (req: Request ,res: Response) => {
    const dataCreateUser: iCreateUserRequest = req.body
    const newUser = await createUserService(dataCreateUser)
    return res.status(201).json(newUser)
}

export const getAllUsersController = async (req: Request, res: Response) => {
    const allUsers = await getAllUsersService()
    return res.status(200).json(allUsers)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const userLogged: iReturnUser = req.userLogged
    await deleteUserService(id, userLogged)
    
    return res.status(204).json({})
}

export const updateUserController = async (req: Request, res: Response) => {
    const idUser: string = req.params.id
    const dataUpdate: iUpdateUser = req.body
    const userLogged: iReturnUser = req.userLogged
    const updatedUser = await updateUserService(idUser, dataUpdate, userLogged)

    return res.status(200).json(updatedUser) 
}

export const deactivateAccountController = async (req: Request, res: Response) => {
    const idUser: string = req.params.id
    const userLogged: iReturnUser = req.userLogged
    const message = await deactivateAccountService(idUser, userLogged)

    return res.status(200).json(message)
}

export const activateAccountController = async (req: Request, res: Response) => {
    const idUser: string = req.params.id
    const passwordUser: string = req.body.password
    const user = await activateAccountService(idUser, passwordUser)

    return res.status(200).json(user)
}