


const viewSala = (req,res) => {
    let mensajes = req.body.mensajes;
    return res.render('salaChat.pug',{nombreSala: req.body.chat,mensajes: mensajes});
}


module.exports = {
    viewSala
}