const express = require('express');
const routes = require('./routes/index.js');


const app = express();

app.set('view engine', 'jade');
app.use(express.urlencoded());

const path = __dirname + '/views/';

app.use(express.static(path));

app.use(routes);

app.listen(3000, ()=>{
    console.log("app listenig on port 3000");
})