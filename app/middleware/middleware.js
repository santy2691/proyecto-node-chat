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

const agregarChatAlBody = (req,res,next) =>{
    req.body.sala = req.params.chat;
    next();
}

const mensajeChat = async function(req,res,next) {
    let sala = req.body.sala;
    let mensajes = await Mensaje.find({sala_chat: sala});
    req.body.mensajes = mensajes;
    next(); 
}

// middleware para guardar mensaje a la base de datos 
const guardarMensaje = async function(req,res,next) {
    let mensaje = new Mensaje({
        mensaje: req.body.mensaje,
        author: req.user.userName,
        sala_chat: req.body.sala,
    });
    try {
        const msj = await mensaje.save();
        req.mensaje = msj;
        next(); 
    } catch (error) {
        res.redirect('back');
    }
}

module.exports = {
    newUser,
    mensajeChat,
    guardarMensaje,
    isAuthenticated,
    agregarChatAlBody
}