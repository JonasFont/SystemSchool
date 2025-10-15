const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

//Rota de login
router.post('/login', async (res, req) => {
    const { email, password} = req.body; //Pega os dados do formnulario
    try{
        const user = await User.findOne({ email }); //Prcoura no MongDB por um usuarui com esse email
        if(!user) return res.status(400).json({msg: 'Usuário não encontrado'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Senha incorreta"});

        const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET, { expiresIn: '2h'});
        res.json({token, user: {id: user._id, name: user.name, email: user.email}});
    }catch (err){
        res.status(500).json({ error: err.message})
    }
});


//Cadstro de novos usuários internos (protegido)
router.post('/register', auth, async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const newUser = await User.createUser(name, email, password);
        res.json({ msg: "Usuário criado com sucesso", user: {name: newUser.name, email: newUser.email}});
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
module.exports = router;