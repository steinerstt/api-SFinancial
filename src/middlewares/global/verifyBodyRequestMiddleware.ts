import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../../errors";

export const verifyBodyRequestMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    const validatedBody = await schema.validate(req.body, {abortEarly: false, stripUnknown: true}).catch((err) => {
        throw new AppError(400, err.errors)
    })

    req.body = validatedBody
    return next()
}