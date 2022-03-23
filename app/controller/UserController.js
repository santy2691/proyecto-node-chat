let User = require('../models/User');



// middleware para logear un usuario 
const login = function(req,res,next) {
    
}

// middleware para crear un nuevo usuario 
const newUser = async function(req,res,next) {
    let user = new User({
        userName: req.body.name, 
        password: req.body.password
    });
    try {
        await user.save();
        next(); 
    } catch (error) {
        res.redirect('back');
    }
}


const viewHome = function(req,res) {
    return res.redirect('/chat/list');
}

module.exports = {
    newUser,
    viewHome
}