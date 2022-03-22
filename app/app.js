const express = require('express');
const routes = require('./routes/index.js');
const path = require('path');

mongoose = require('mongoose');
const app = express();

// conexion a la base de datos

mongoose.connect('mongodb://root:pass12345@localhost:27017/chat-node?authSource=admin',{
      useUnifiedTopology: true, 
      useNewUrlParser: true },
    (err, res) => {
        if (err) console.log(`ERROR: connecting to Database.  ${err}`);
        else console.log(`Database Online:`);
    }
);

// agregar el motor de plantillas 
app.set('view engine', 'pug');



// rutas de las views
app.use(express.static(path.resolve("views/")));
// rutas de los ficheros estaticos (css y js)
app.use(express.static(path.resolve("public/")));
app.use(express.urlencoded());

// agregar las rutas
app.use(routes);

app.listen(3000, ()=>{
    console.log("app listenig on port 3000");
})