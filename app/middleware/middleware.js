let User = require('../models/User');
const Mensaje = require('../models/Mensaje');


// middleware para crear un nuevo usuario 
const newUser = async function(req,res,next) {
    let user = new User({
        userName: req.body.username, 
        password: req.body.password
    });
    try {
        await user.save();
        next(); 
    } catch (error) {
        res.redirect('back');
    }
}

const isAuthenticated = function(req,res,next)  {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('back');
}



const mensajeChat = async function(req,res,next) {
    let sala = req.body.sala;
    let mensajes = await Mensaje.find({sala_chat: sala});
    console.log(mensajes);
    next(); 
}

module.exports = {
    newUser,
    mensajeChat,
    isAuthenticated
}