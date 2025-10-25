// Importa o Express e cria um roteador
const express = require('express');
const router = express.Router();

// Importa o modelo de alunos definido em models/Student.js
const Student = require("../models/Stundent");

// Importa o middleware de autenticação JWT
const auth = require('../middleware/auth');

// Rota de criação do aluno - CRUD - C
router.post('/', auth, async (req, res) => {
    try{
        // Cria um novo objeto de aluno com os dados enviados (via body)
        const newStudent = new Student(req.body);

        // Salva o aluno no banco de dados
        const savedStudent = await newStudent.save();

        // Retorna o aluno criado em formato JSON
        res.json(savedStudent)
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get('/', auth, async (req, res) => {
    try{
        // Busca todos os alunos cadastrados
        const students = await Student.find();

        // Retorna a lista como json
        res.json(students);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// Rota para atualizar os alunos
router.put('/:id', auth, async (req, res) => {
    try{
        // Atualiza o aluno pelo ID recebido com parâmetro da URL
        const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body);
        console.log("Aluno atualizado com sucesso");

        // Retorna o aluno atualizado
        res.json(updateStudent);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// Rota para deletar alunos
router.delete("/:id", auth, async (req, res) => {
    try{
        // Encontra o aluno pelo ID e remove do banco
        await Student.findByIdAndDelete(req.params.id);
        
        // Retorna mensagem de sucesso
        res.json({msg: "Aluno deletado com sucesso"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

// Exporta o roteador para ser usado no servidor principal
module.exports = router;