import { Request, Response } from "express";
import Expenses from "../models/Category";

class ExpensesController{
    public async createExpenses (req: Request, res: Response){
        try {
            console.log("Recebendo dados:", req.body); // Adicionando log
            const { description, amount, date } = req.body;
        
            if (!date) {
              return res.status(400).json({ error: "A data da despesa é obrigatória." });
            }
        
            const dateParts = date.split("-");
            const formattedDate = new Date(
              parseInt(dateParts[0]),
              parseInt(dateParts[1]) - 1,
              parseInt(dateParts[2])
            );
        
            const newExpense = new Expenses({
              description,
              amount,
              date: formattedDate,
            });
        
            await newExpense.save();
            console.log("Despesa cadastrada com sucesso:", newExpense);
            res.status(201).json(newExpense);
          } catch (error) {
            console.error("Erro ao cadastrar despesa:", error);
            res.status(500).json({ error: "Erro ao cadastrar despesa." });
          }
        };
    
    public async getTotalExpenses (req: Request, res: Response){
        try{
            const total = await Expenses.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
             }
            ]);
        
        const totalAmount = total.length > 0 ? total[0].totalAmount : 0;

        res.json({ totalAmount });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao calcular o total das despesas'})
    }};

    public async updateExpenses (req: Request, res: Response){
        const { id } = req.params;
        const { description, amount, date} = req.body;
        try{
            const response = await Expenses.findByIdAndUpdate(
                id,
                {description, amount, date},
                { new: true }
            )
            if (!response) {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
            res.status(200).json(response); 
        } catch (error) {
            console.error("Erro ao atualizar despesa:", error);
            res.status(500).json({ error: 'Erro ao atualizar despesa' });
        }
    }
    
    public async listExpenses(req: Request, res: Response) {
        try {
            const expenses = await Expenses.find();
            res.json(expenses);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar despesas' });
        }
    }

    public async deleteExpense(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const response = await Expenses.findByIdAndDelete(id);
            if (!response) {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
            res.status(200).json({ message: 'Despesa deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar despesa' });
        }
    }
}

export default new ExpensesController();