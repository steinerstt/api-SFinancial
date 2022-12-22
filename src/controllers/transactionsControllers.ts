import { Request, Response } from "express";
import { Transaction } from "../entities/transactionsEntity";
import { iCreateTransaction, iReturnTransaction, iUpdateTransaction } from "../interfaces/transactionsInterface";
import { iReturnUser } from "../interfaces/usersInterface";
import { createTransactionService } from "../services/transactions/createTransactionService";
import { deleteTransactionService } from "../services/transactions/deleteTransactioService";
import { getAllTransactionsService } from "../services/transactions/getAllTransactionsService";
import { getTransactionService } from "../services/transactions/getTransactionService";
import { updateTransactionService } from "../services/transactions/updateTransactionService";

export const createTransactionController = async (req: Request, res: Response) => {
    const dataTransaction: iCreateTransaction = req.body
    const userLogged: iReturnUser = req.userLogged
    const newTransaction = await createTransactionService(dataTransaction, userLogged)
    return res.status(201).json(newTransaction)
}

export const getAllTransactionsController = async (req: Request, res: Response) => {
    const allTransactions = await getAllTransactionsService()
    return res.status(200).json(allTransactions)
}

export const deleteTransactionController = async (req: Request, res: Response) => {
    const transaction: Transaction = req.transactionSelected
    const userLogged: iReturnUser = req.userLogged    
    await deleteTransactionService(transaction, userLogged)
    return res.status(204).json({})
}

export const updateTransactionController = async (req: Request, res: Response) => {
    const transactionSelected: Transaction = req.transactionSelected
    const updateData: iUpdateTransaction = req.body
    const userLogged: iReturnUser = req.userLogged
    const updatedTransaction = await updateTransactionService(transactionSelected, updateData, userLogged)
    return res.status(200).json(updatedTransaction)
}

export const getTransactionController = async (req: Request, res: Response) => {
    const transactionSelected: Transaction = req.transactionSelected
    const userLogged: iReturnUser = req.userLogged
    const transaction: iReturnTransaction = await getTransactionService(transactionSelected, userLogged)
    return res.status(200).json(transaction)
}