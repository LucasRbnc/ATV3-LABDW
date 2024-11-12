import { Router } from "express";
import expenses from "./expenses"

const routes = Router()

routes.use("/expenses", expenses);

export default routes