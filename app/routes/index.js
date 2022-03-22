const express = require('express');

const router = express.Router();



router.get('/',(req,res)=>{
    res.render("index.pug");
});


router.get('/chat/list',(req,res) => {
    res.render("listChat.pug");
})

module.exports = router;