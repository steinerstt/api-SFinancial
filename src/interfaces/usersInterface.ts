import { iReturnTransaction } from "./transactionsInterface"

export interface iCreateUserRequest {
    name: string,
    email: string,
    password: string,
}

export interface iReturnUser {
    id: string,
    name: string,
    email: string,
    is_active: boolean,
    is_adm: boolean,
    transactions: iReturnTransaction[],
    created_at: Date,
    updated_at: Date
}

export interface iUpdateUser {
    name?: string,
    email?: string,
    password?: string
}

export interface iActivateAccount {
    password: string
}