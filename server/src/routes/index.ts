import { Router } from "express";
import usersRouter from "./api/users"
const routes = Router()

routes.use("/users", usersRouter)

export default routes