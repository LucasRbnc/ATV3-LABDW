import { Router } from "express";
import controller from "../controllers/ExpensesController";

const routes = Router();

routes.get("/total", controller.getTotalExpenses);

export default routes;