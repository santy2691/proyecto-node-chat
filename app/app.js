const express = require('express');
const routes = require('./routes/index.js');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const path = require('path');

mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);

// conexion a la base de datos
mongoose.connect('mongodb://root:pass12345@localhost:27017/chat-node?authSource=admin',{
      useUnifiedTopology: true, 
      useNewUrlParser: true },
    (err, res) => {
        if (err) console.log(`ERROR: connecting to Database.  ${err}`);
        else console.log(`Database Online:`);
    }
);


// inicializar la estrategia de password
require('./auth/auth');


// configuracion de session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));


// configuracion de passport para la authentificacion 
app.use(passport.initialize());
app.use(passport.session());

// agregar el motor de plantillas 
app.set('view engine', 'pug');



// rutas de las views
app.use(express.static(path.resolve("views/")));
// rutas de los ficheros estaticos (css y js)
app.use(express.static(path.resolve("public/")));
app.use(express.urlencoded());


// middleware global para almacenar el usuario 
app.use((req,res,next)=>{
    app.locals.user = req.user;
    next()
});
// agregar las rutas
app.use(routes);

server.listen(3000, ()=>{
    console.log("app listenig on port 3000");
})