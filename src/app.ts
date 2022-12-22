import "express-async-errors"
import express from "express"
import { handleError } from "./errors"
import { usersRouter } from "./routes/usersRouter"
import { loginRouter } from "./routes/loginRouter"
import { transactionsRouter } from "./routes/transactionsRouter"


export const app = express()
app.use(express.json())
app.use("/users", usersRouter)
app.use("/login", loginRouter)
app.use("/transactions", transactionsRouter)
app.use(handleError)

