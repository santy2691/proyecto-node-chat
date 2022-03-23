const express = require('express');
const userController = require('../controller/UserController');


const router = express.Router();


// ruta que envia la la pag de login 
router.get('/',(req,res)=>{
    res.render("index.pug");
});

// ruta de la lista de chats 
router.get('/chat/list',(req,res) => {
    res.render("listChat.pug");
})

// ruta de la sala de chat 
router.get('/chat/view/chat*',(req,res) => {
    res.send("funciona");
});

// ruta que envia a la pag de registro de un nuevo usuario 
router.get('/registrer',(req,res)=> res.render('registrer.pug'));

// ruta para registrar un nuevo usuario 
router.post('/registrer',[userController.newUser,userController.viewHome]);




module.exports = router;