import { AppDataSource } from "../../data-source"
import { Transaction } from "../../entities/transactionsEntity"
import { AppError } from "../../errors"
import { iReturnUser } from "../../interfaces/usersInterface"

export const deleteTransactionService = async (transaction: Transaction, userLogged: iReturnUser) => {

    const transactionRepository = AppDataSource.getRepository(Transaction)

    if (!userLogged.is_adm) {
        if (!(transaction.user.id == userLogged.id)) {
            throw new AppError(409, "Permission admin required")
        }
    }
 
    await transactionRepository.remove(transaction)
    return {}
}