var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String, 
        unique: true
    },
    password: String
});


userSchema.methods.verificarPassword = function(password) {
    return password === this.password;
}

module.exports = mongoose.model('User',userSchema);