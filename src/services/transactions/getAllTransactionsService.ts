import { AppDataSource } from "../../data-source"
import { Transaction } from "../../entities/transactionsEntity"
import { returnAllTransactionsSchema } from "../../schemas/transactionsSchemas"

export const getAllTransactionsService = async () => {
    const transactionsRepository = AppDataSource.getRepository(Transaction)
    const allTransactions = await transactionsRepository.find({relations: {
        user: true
    }})

    return await returnAllTransactionsSchema.validate(allTransactions, {stripUnknown: true})
}