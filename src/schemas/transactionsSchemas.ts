import * as yup from "yup"
import { SchemaOf } from "yup"
import { iCreateTransaction, iReturnTransaction, iUpdateTransaction } from "../interfaces/transactionsInterface"

const regexOnlyNumber = /\D/g
const regexDate = /\d{4}-\d{2}-\d{2}/
const messageErrorDate = "The date must be in the following format: yyyy-mm-dd"
const messageErrorType = "Only Entrada or Saída"

const handleVerifyType = (type: string) => {
    const valuesAccepted = ["Entrada", "Saída"]

    if (!valuesAccepted.includes(type)) {
        return false
    }

    return true
}

export const createTransactionSchema: SchemaOf<iCreateTransaction> = yup.object().shape({
    name: yup.string().min(2).max(62).required(),
    value: yup.mixed().transform((value) => Number(String(value).replace(regexOnlyNumber, ""))).required(),
    type: yup.string().min(5).max(7).test({message: messageErrorType, test: (type) => handleVerifyType(type)}).required(),
    transaction_date: yup.string().matches(regexDate, messageErrorDate).required()
})

export const returnTransactionSchema: SchemaOf<iReturnTransaction> = yup.object().shape({
    id: yup.string().uuid(),
    name: yup.string(),
    value: yup.number(),
    type: yup.string(),
    transaction_date: yup.string(),
    user: yup.object().shape({
        id: yup.string().uuid()
    }),
    created_at: yup.date(),
    updated_at: yup.date()
})

export const returnAllTransactionsSchema = yup.array(returnTransactionSchema)

export const updateTransactionSchema: SchemaOf<iUpdateTransaction> = yup.object().shape({
    name: yup.string().min(2).max(62),
    value: yup.mixed().transform((value) => Number(String(value).replace(regexOnlyNumber, ""))),
    type: yup.string().min(5).max(7).test({message: messageErrorType, test: (type) => handleVerifyType(type)}),
    transaction_date: yup.string().matches(regexDate, messageErrorDate)
})