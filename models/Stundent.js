const mongoose = require('mongoose');

//Schema para alunos
const StundtSchema = new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number},
    brade: {type: String},
    matricula: {type:Number, unique: true}
})

module.exports = mongoose.model('Student', StundtSchema);
