// config/db.js
// Este arquivo conecta o servidor Node.js ao banco de dados MongoDB usando Mongoose.

const mongoose = require('mongoose')

// Função assíncrona que faz a conexão com o MongoDB
const connectDB = async () => {
  try {
    // Conecta ao banco usando a variável de ambiente MONGO_URL
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB conectado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message)
    // Encerra o processo se houver erro na conexão
    process.exit(1)
  }
}

module.exports = connectDB
