const express = require('express');
const router = express.Router();
const { getQuote } = require('../quote');


router.get('/', function(req, res) {
    const quote = getQuote()
    res.render('about', {quote: quote, title: "about"});
})

router.get('/description', function(req, res) {
    res.send('Página descripción ');
})

router.get('/*', function(req, res) {
    res.send('Página about con wildcard');
})

module.exports = router;