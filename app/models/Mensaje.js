var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
    mensaje: String,
    author: String,
    sala_chat: String,
    create_at:{type: Date, default: Date.now}
});


module.exports = mongoose.model('Mensaje',mensajeSchema);