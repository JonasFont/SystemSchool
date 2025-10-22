// createAdmin.js
// Script simples para criar o primeiro administrador no sistema

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')

// Carrega variáveis do arquivo .env
dotenv.config()

// Conecta ao banco de dados
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.log('❌ Erro na conexão:', err))

// Função principal que cria um admin
const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@escola.com' })
    if (existing) {
      console.log('⚠️ Usuário admin já existe!')
      process.exit()
    }

    // Cria novo usuário admin
    const admin = new User({
      name: 'Admin',
      email: 'admin@escola.com',
      password: '123456', // será criptografada automaticamente
    })

    await admin.save()
    console.log('✅ Usuário admin criado com sucesso!')
    process.exit()
  } catch (err) {
    console.error('❌ Erro ao criar admin:', err.message)
    process.exit(1)
  }
}

createAdmin()
