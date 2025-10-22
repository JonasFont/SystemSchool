// routes/auth.js
// Controla o login e autenticação de usuários do sistema.

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// POST /api/auth/login — autenticação de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' })
    }

    // Verifica se a senha está correta
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' })
    }

    // Gera um token JWT com o ID do usuário
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' })

    // Retorna o token e as informações básicas do usuário
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
