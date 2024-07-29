var express = require('express');
var router = express.Router();
const { getQuote } = require('../quote');

router.get('/', function(req, res) {
    randomQuote = getQuote()
    res.render('about', {quote: randomQuote});
})
  
router.get('/about/description', function(req, res) {
    res.send('Página descripción ');
})
  
router.get('/about*', function(req, res) {
    res.send('Página about con wildcard');
})

module.exports = router;
