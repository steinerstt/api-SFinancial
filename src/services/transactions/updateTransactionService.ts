import { AppDataSource } from "../../data-source"
import { Transaction } from "../../entities/transactionsEntity"
import { AppError } from "../../errors"
import { iUpdateTransaction } from "../../interfaces/transactionsInterface"
import { iReturnUser } from "../../interfaces/usersInterface"
import { returnTransactionSchema } from "../../schemas/transactionsSchemas"

export const updateTransactionService = async (transactionSelected: Transaction, updateData: iUpdateTransaction, userLogged: iReturnUser) => {
    const transactionRepository = AppDataSource.getRepository(Transaction)

    if (!userLogged.is_adm) {
        if (!(userLogged.id == transactionSelected.user.id)) {
            throw new AppError(401, "Permission admin required")
        }
    }

    const updatedTrsansaction = transactionRepository.create({...transactionSelected, ...updateData})
    const returnUpdatedTransaction = await transactionRepository.save(updatedTrsansaction)
    return await returnTransactionSchema.validate(returnUpdatedTransaction, {stripUnknown: true})
}