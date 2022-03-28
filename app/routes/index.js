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
    middleware.isAuthenticated,
    middleware.mensajeChat,
    chatController.viewSala
]);

router.get('/chat/view/chat*',[
    middleware.isAuthenticated,
    chatController.viewSala
]);


router.get('/logout',(req,res)=> {
    req.session.destroy();
    res.redirect('/login');
})
// ruta que envia a la pag de registro de un nuevo usuario 
router.get('/registrer',(req,res)=> res.render('registrer.pug'));

// ruta para registrar un nuevo usuario 
router.post('/registrer',[
    middleware.newUser,
    passport.authenticate('isLogin',{
        successRedirect: '/chat/list',
        failureRedirect: '/'
    })
]);

router.post('/user/login',[ 
    passport.authenticate('isLogin',{
        successRedirect: '/chat/list',
        failureRedirect: '/'
    })
]);


router.post('/chat/send',[
    middleware.isAuthenticated,
    middleware.guardarMensaje,
    (req,res)=>{
        return res.json({ok: "ok"})
    }
]);


module.exports = router;