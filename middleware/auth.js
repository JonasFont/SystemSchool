const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({msg: 'Sem token, acesso negado'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (err){
        res.status(400).json({ msg: 'Token inválido'})
    }
}
module.exports =auth;