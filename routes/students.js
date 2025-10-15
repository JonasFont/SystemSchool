//Importa o Express e cria um roteador
const express = require('express');
const router = express.Router();

//Importa o modelo de alunpos(Definido em models/Stundent.JS)
const Stundent = require('../models/Student');

//Importa o middleware de autenticação JWT
const auth = require('../middleware/auth');


//Rota de criação do aluno CRUD (C)
router.post('/', auth, async(req, res) => {
    try{
        //Cria um novo objeto de aluno com os dados enviados pelo cliente(via body)
        const newStudent = new Stundent(req.body);

        //Salva o aluno no banco de dados MONGODB
        const savedStudent = await newStudent.save();
        //Retorno o aluno criado em formato JSON
        res.json(savedStudent);
    }catch (err){
        res.status(500).json({error: err.message});
    }
});
//Rota de listagem de alunos
router.get('/', auth, async(req, res) => {
    try{
        //Busca todos os alunos cadastrados
        const stundents = await Stundent.find();
        //Retornando a lista como JSON
        res.json(stundents);
    }catch (err) {
        res.status(500).json({error: err.message})
    }
});

//rota para autualizar os alunos
router.put('/:id', auth, async (req, res) => {
    try{
        //Atualiza o aluno pelo ID recebido com parâmetro da URL
        const updateStudent = await Stundent.FindByIDAndUpdate(req.params.id, req.body);
        console.log("Aluno atualizado com sucesso")
        //retorna o aluno atulizado;
        res.json(updateStudent);
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
//Rota de delete
router.delete("/:id", auth, async (req, res)=> {
    try{
        //Encontra o aluno pelo ID e remove do banco
        await Stundent.FindByIDAndDelete(req.params.id);
        //Retoran mensagem de sucesso
        res.json({msg: 'Aluno deletado com sucesso!'})
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
//Exporta o roteador para ser usado no servidor principal
module.exports = router;