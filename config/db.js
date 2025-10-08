const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB conectado com sucesso");
    }catch (error){
        console.log("Erro ao conectar ao mongoDB", error.message);
        precess.exit(1);
    }
};
module.exports = connectDB;