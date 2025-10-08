const mongoose = requere('mongoose');
const bcrypt = require('bcryptjs');

//Schema de usuário internos
const UserSchema = new mongoose.Schema({
    name: { type: String, requered: true},
    email: { type: String, requered: true, unique: true},
    password: { type: String, requered: true}
});

//função estática para criar usuário
UserSchema.static.createUser = async function(name, email, password) {
    const existingUser = await this.findOne({ email});
    if(existingUser) throw new Error('Usuário já existe');

    const cript = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, cript);

    const newUser = new this({name, email, password: hashedPassword});
    return await newUser.save(); //Salva no mongoDB
};

module.exports = mongoose.model('User', UserSchema);