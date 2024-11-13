import { Router } from "express";
import controller from "../controllers/ExpensesController";

const routes = Router();

routes.post("/create", controller.createExpenses);
routes.put("/update", controller.updateExpenses);
routes.delete("/delete/:id", controller.deleteExpense);
routes.get("/list", controller.listExpenses)
routes.get("/total", controller.getTotalExpenses);

export default routes;