// server.js
// Arquivo principal do servidor Node.js (Express)

const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Carrega variáveis de ambiente do .env
dotenv.config()

// Conecta ao MongoDB
connectDB()

// Inicializa o Express
const app = express()

// Middleware para permitir JSON nas requisições
app.use(express.json())

// Importa rotas e registra prefixos
app.use('/api/auth', require('./routes/auth'))
app.use('/api/students', require('./routes/students'))

// Define porta padrão
const PORT = process.env.PORT || 5000

// Inicia o servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`))
