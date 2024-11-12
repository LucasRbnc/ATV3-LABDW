import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes";
import { connect } from "./database/connection";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conecta ao MongoDB
connect();

// Serve o arquivo HTML na rota raiz "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

// Rota para outras rotas do aplicativo
app.use(routes);

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});
