// models/Student.js
// Modelo que representa os alunos cadastrados no banco.

const mongoose = require('mongoose')

// Define a estrutura dos dados dos alunos
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },   // nome do aluno
  age: { type: Number, required: true },    // idade
  grade: { type: String, required: true },  // série ou turma
})

// Exporta o modelo para ser usado nas rotas
module.exports = mongoose.model('Student', StudentSchema)
