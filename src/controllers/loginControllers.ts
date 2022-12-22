import { Request, Response } from "express";
import { iLoginRequest } from "../interfaces/loginInterfaces";
import { loginService } from "../services/login/loginService";

export const loginController = async (req: Request, res: Response) => {
    const dataLogin: iLoginRequest  = req.body
    const [status, dataUser] = await loginService(dataLogin)
    return res.status(Number(status)).json(dataUser)
}