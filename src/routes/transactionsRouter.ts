import { Router } from "express";
import { createTransactionController, deleteTransactionController, getAllTransactionsController, getTransactionController, updateTransactionController } from "../controllers/transactionsControllers";
import { verifyAuthMiddleware } from "../middlewares/global/verifyAuthMiddleware";
import { verifyBodyRequestMiddleware } from "../middlewares/global/verifyBodyRequestMiddleware";
import { verifyUserIsAdmMiddleware } from "../middlewares/global/verifyUserIsAmdMiddleware";
import { verifyExistTransaction } from "../middlewares/transactions/verifyExistTransactionMiddleware";
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transactionsSchemas";

export const transactionsRouter = Router()
transactionsRouter.post("", verifyAuthMiddleware, verifyBodyRequestMiddleware(createTransactionSchema), createTransactionController)
transactionsRouter.get("", verifyAuthMiddleware, verifyUserIsAdmMiddleware, getAllTransactionsController)
transactionsRouter.get("/:id", verifyAuthMiddleware, verifyExistTransaction, getTransactionController)
transactionsRouter.delete("/:id", verifyAuthMiddleware, verifyExistTransaction, deleteTransactionController)
transactionsRouter.patch("/:id", verifyAuthMiddleware, verifyExistTransaction, verifyBodyRequestMiddleware(updateTransactionSchema), updateTransactionController)