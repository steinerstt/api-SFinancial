import { Transaction } from "../../entities/transactionsEntity";
import { iReturnTransaction } from "../../interfaces/transactionsInterface";
import { iReturnUser } from "../../interfaces/usersInterface";

declare global {
    namespace Express {
        interface Request {
            userLogged: iReturnUser,
            transactionSelected: Transaction
        }
    }
}