// middleware/auth.js
// Middleware responsável por validar o token JWT e proteger as rotas privadas

const jwt = require('jsonwebtoken')

// Middleware principal
function auth(req, res, next) {
  // Pega o token do cabeçalho 'x-auth-token'
  const token = req.header('x-auth-token')

  // Se não existir token, bloqueia o acesso
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado: nenhum token fornecido' })
  }

  try {
    // Decodifica o token usando a chave secreta do .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Adiciona o usuário decodificado ao objeto req
    req.user = decoded
    // Continua para o próximo middleware ou rota
    next()
  } catch (error) {
    res.status(400).json({ msg: 'Token inválido' })
  }
}

module.exports = auth
