import * as yup from "yup"
import {SchemaOf} from "yup"
import { iLoginRequest } from "../interfaces/loginInterfaces"

export const loginSchema: SchemaOf<iLoginRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})