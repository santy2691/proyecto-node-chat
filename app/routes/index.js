const express = require('express');
const userController = require('../controller/UserController');
const chatController = require('../controller/ChatController');
const historyController = require('../controller/historyController');
const middleware = require('../middleware/middleware');
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


// ruta para la vista donde eliges al sala 
router.get('/history/list',[
    middleware.isAuthenticated,
    (req,res)=>{
        return res.render('listHistory.pug');
}]);

// ruta post para agregar a body el sala seleccionada 
router.post('/history/list',[
    middleware.isAuthenticated,
    historyController.selectChatHistory
]);

// routa para mirar el historial de un chat
router.get('/history/view/:chat',[
    middleware.isAuthenticated,
    middleware.agregarChatAlBody,
    middleware.mensajeChat, // para que me genere un array vacio y no me cause error en el pug 
    historyController.viewSalaHistory
]);

router.get('/history/delete/:chat',[
    middleware.isAuthenticated,
    middleware.agregarChatAlBody,
    middleware.borrarSalaChat,
    middleware.mensajeChat,
    historyController.viewSalaHistory
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
        return res.json({success: "ok", mensaje: req.mensaje})
    }
]);

module.exports = router;