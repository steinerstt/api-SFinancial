import { Router } from "express";
import { activateAccountController, createUserController, deactivateAccountController, deleteUserController, getAllUsersController, updateUserController } from "../controllers/usersControllers";
import { verifyAuthMiddleware } from "../middlewares/global/verifyAuthMiddleware";
import { verifyBodyRequestMiddleware } from "../middlewares/global/verifyBodyRequestMiddleware";
import { verifyUserIsAdmMiddleware } from "../middlewares/global/verifyUserIsAmdMiddleware";
import { verifyExistUserMiddleware } from "../middlewares/users/verifyExistUserMiddleware";
import { activateAccountSchema, createUserSchema, updateUserSchema } from "../schemas/usersSchemas";

export const usersRouter = Router()
usersRouter.post("", verifyBodyRequestMiddleware(createUserSchema), createUserController)
usersRouter.get("", verifyAuthMiddleware, verifyUserIsAdmMiddleware, getAllUsersController)
usersRouter.delete("/:id", verifyAuthMiddleware, verifyExistUserMiddleware, deleteUserController)
usersRouter.patch("/:id", verifyAuthMiddleware, verifyExistUserMiddleware, verifyBodyRequestMiddleware(updateUserSchema), updateUserController)
usersRouter.patch("/:id/account/deactivate", verifyAuthMiddleware, verifyExistUserMiddleware, deactivateAccountController)
usersRouter.patch("/:id/account/activate", verifyExistUserMiddleware, verifyBodyRequestMiddleware(activateAccountSchema), activateAccountController)