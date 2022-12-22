import { Router } from "express";
import { loginController } from "../controllers/loginControllers";
import { verifyBodyRequestMiddleware } from "../middlewares/global/verifyBodyRequestMiddleware";
import { loginSchema } from "../schemas/loginSchemas";

export const loginRouter = Router()
loginRouter.post("", verifyBodyRequestMiddleware(loginSchema), loginController)