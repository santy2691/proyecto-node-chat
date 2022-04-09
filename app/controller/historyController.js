


const selectChatHistory = (req,res)=>{
    let opcion = req.body.opcion;
    res.redirect('/history/view/' + opcion);
}


const viewSalaHistory = (req,res)=>{
    let mensajes = req.body.mensajes;
    res.render('historyChat.pug',{nombreSala: req.body.sala,mensajes: mensajes});
}

module.exports = {
    selectChatHistory,
    viewSalaHistory
}