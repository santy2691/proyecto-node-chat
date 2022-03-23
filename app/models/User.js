var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String, 
        unique: true
    },
    password: String
});


module.exports = mongoose.model('User',userSchema);