//Importa o express 
const express = require('express');

//Importando a função que conecta ao banco MongoDB
const connectDB = require('./config/db');

//Importan o dotenv (carrega as variaveis do arquivo .env)
const dotenv = require(dotenv);

//Carrega as variaveis dos arquivos .env
dotenv.config();

//Conecta ao MongoDB (ver config/db);
connectDB();

//Craia a aplicação Express
const app = express()

//Permite que o servidor entenda dados JSON no corpo da requisições
app.use(express.json());

//Rota de autenticação e login(usuários internos)
app.use('/api/auth', require('./routes/auth'));

//Rota CRUD de alunos
app.use('/api/students', require('./routes/students'));

//Define a porta do servidor
const PORTA = process.env.PORT || 5000;

//Inicia o servidor
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`)
);