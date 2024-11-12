import { Request, Response } from "express";
import Expenses from "../models/Category";

class ExpensesController{
    public async createExpenses (req: Request, res: Response){
        const {description, amount, date} = req.body
        try{
            const response = Expenses.create(description, amount, date);
            res.send(response);
        } catch( error ){
            res.status(500).json({ error: 'Deu Merda'})
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
        const { description, amount, date} = req.body;
        try{
            const response = await Expenses.updateMany(
                {description, amount, date},
                { $set :{description, amount, date}}
            )
            if (response.modifiedCount === 0){
                return res.status(404).json({ message: 'Não encontramos registro para atualizar'})
            }
            res.status(200).json({message: 'Despesas atualizadas com sucesso'})
        } catch(error){
            res.status(206).json({ error: 'Erro'})
        }
    }
}

export default new ExpensesController();