//Importa o Mongoose
const mongoose = require('mongoose');

//importa o dotenv
const dotenv = require('dotenv');

//importa o modelo de usuário 
const User = require('./models/User');

//Carrega variaveis de ambiente
dotenv.config();

//Função para conectar o banco MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongDB conectado com sucesso"))
    .catch(err => console.log("Erro ao conectar ao banco:", err.message));

//Função para criar o ADM
const createAdmin = async () => {
    try{
        //Chama a função "createUser"
        const admin = await User.createUser('admin', 'admin@escola.com', '123456');

        conosle.log('Usuario criado com sucesso');
        console.log(admin);
        process.exit();
    }catch (err){
        console.error("Erro ao criar o admin", err.message);
        process.exit(1);
    }
};
createAdmin(); //Excuta a função