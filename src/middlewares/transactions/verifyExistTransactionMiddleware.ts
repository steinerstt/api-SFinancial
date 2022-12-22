import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/transactionsEntity";
import { AppError } from "../../errors";

export const verifyExistTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const transactionRepository = AppDataSource.getRepository(Transaction)
    const idTransaction: string = req.params.id

    const transaction = await transactionRepository.findOne({where: {id: idTransaction}, relations: {
        user: true
    }})

    if (!transaction) {
        throw new AppError(404, "Transaction not found")
    }

    req.transactionSelected = transaction

    return next()
}