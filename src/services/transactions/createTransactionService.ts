import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/transactionsEntity";
import { User } from "../../entities/usersEntity";
import { iCreateTransaction } from "../../interfaces/transactionsInterface";
import { iReturnUser } from "../../interfaces/usersInterface";
import { returnTransactionSchema } from "../../schemas/transactionsSchemas";

export const createTransactionService = async (dataTransaction: iCreateTransaction, userLogged: iReturnUser) => {
    const transactionRepository = AppDataSource.getRepository(Transaction)
    const userRepository = AppDataSource.getRepository(User)

    const newTransaction = transactionRepository.create({...dataTransaction})
    const user = await userRepository.findOneBy({id: userLogged.id})
    newTransaction.user = user
    await transactionRepository.save(newTransaction)

    return await returnTransactionSchema.validate(newTransaction, {stripUnknown: true})
}