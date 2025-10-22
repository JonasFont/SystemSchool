// models/User.js
// Define o modelo de usuário interno (quem pode acessar o sistema)

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Schema define os campos e regras da coleção "users"
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },               // nome do usuário
  email: { type: String, required: true, unique: true }, // e-mail único
  password: { type: String, required: true },           // senha (criptografada)
})

// Antes de salvar o usuário, criptografa a senha automaticamente
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next() // se não alterou senha, pula
  const salt = await bcrypt.genSalt(10) // gera um "sal" aleatório
  this.password = await bcrypt.hash(this.password, salt) // aplica hash
  next()
})

// Método para comparar senha digitada com senha armazenada (login)
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
