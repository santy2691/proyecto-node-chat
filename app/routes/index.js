const express = require('express');
const userController = require('../controller/UserController');
const chatController = require('../controller/ChatController');
const middleware = require('../middleware/middleware')
const passport = require('passport');


const router = express.Router();


// ruta que envia la la pag de login 
router.get('/',(req,res)=>{
    res.render("index.pug");
});

// ruta de la lista de chats 
router.get('/chat/list',[middleware.isAuthenticated,(req,res) => {
    res.render("listChat.pug");
}])

// ruta de la sala de chat 
router.post('/chat/view/chat*',[
    middleware.mensajeChat,
    chatController.viewSala
]);

// ruta que envia a la pag de registro de un nuevo usuario 
router.get('/registrer',(req,res)=> res.render('registrer.pug'));

// ruta para registrar un nuevo usuario 
router.post('/registrer',[
    middleware.newUser,
    userController.viewHome
]);

router.post('/user/login',[ 
    passport.authenticate('login',{
        successRedirect: '/chat/list',
        failureRedirect: '/'
    })
]);


module.exports = router;