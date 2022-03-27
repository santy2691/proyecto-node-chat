


const viewSala = (req,res) => {
    return res.render('salaChat.pug',{nombreSala: req.body.chat});
}


module.exports = {
    viewSala
}