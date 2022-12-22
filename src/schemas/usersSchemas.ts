import * as yup from "yup"
import { SchemaOf } from "yup"
import { iActivateAccount, iCreateUserRequest, iReturnUser, iUpdateUser } from "../interfaces/usersInterface"
import {  returnTransactionSchema } from "./transactionsSchemas"

export const createUserSchema: SchemaOf<iCreateUserRequest> = yup.object().shape({
    name: yup.string().min(3).max(62).required(),
    email: yup.string().email().min(4).max(120).required(),
    password: yup.string().min(4).max(72).required()
})

export const returnUserSchema: SchemaOf<iReturnUser> = yup.object().shape({
    id: yup.string().uuid(),
    name: yup.string(),
    email: yup.string().email(),
    is_active: yup.boolean(),
    is_adm: yup.boolean(),
    transactions: yup.array(returnTransactionSchema.omit(["user"])),
    created_at: yup.date(),
    updated_at: yup.date()
})

export const returnAllUsersSchema: SchemaOf<iReturnUser[]> = yup.array(returnUserSchema)

export const updateUserSchema: SchemaOf<iUpdateUser> = yup.object().shape({
    email: yup.string().email().min(4).max(120),
    name: yup.string().min(3).max(62),
    password: yup.string().min(4).max(72)
})

export const activateAccountSchema: SchemaOf<iActivateAccount> = yup.object().shape({
    password: yup.string().required()
})