const passport = require('passport');
let User = require('../models/User');


const viewHome = function(req,res) {
    return res.redirect('/chat/list');
}

module.exports = {
    viewHome
}