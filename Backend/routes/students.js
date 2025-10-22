// routes/students.js
// Rotas para criação, listagem, edição e remoção de alunos.

const express = require('express')
const router = express.Router()
const Student = require('../models/Student')
const auth = require('../middleware/auth') // protege as rotas

// 🔹 Criar novo aluno
router.post('/', auth, async (req, res) => {
  try {
    const newStudent = new Student(req.body)
    const savedStudent = await newStudent.save()
    res.json(savedStudent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🔹 Listar todos os alunos
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🔹 Atualizar aluno pelo ID
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedStudent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🔹 Deletar aluno pelo ID
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Aluno deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
