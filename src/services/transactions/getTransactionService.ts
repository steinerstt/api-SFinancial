import { Transaction } from "../../entities/transactionsEntity";
import { AppError } from "../../errors";
import { iReturnUser } from "../../interfaces/usersInterface";
import { returnTransactionSchema } from "../../schemas/transactionsSchemas";

export const getTransactionService = async (transactionSelected: Transaction, userLogged: iReturnUser) => {

    if (!userLogged.is_adm) {
        if (!(transactionSelected.user.id == userLogged.id)) {
            throw new AppError(401, "Permission admin required")
        }
    }

    return await returnTransactionSchema.validate(transactionSelected, {stripUnknown: true})
}