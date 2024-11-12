import mongoose, { Schema } from "mongoose";

const ExpensesSchema = new Schema({
    description:{
        type:String,
        trim: true,
        required: [true, "A descrição é obrigatória"]
    },
    amount:{
        type: Number,
        required: [true, "O valor é um campo obrigatório!"]
    },
    date:{
        type: Date,
    }

});

const ExpensesModel = mongoose.model("Expense", ExpensesSchema, "expenses")

export default ExpensesModel