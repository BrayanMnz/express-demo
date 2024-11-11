var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('tda-251-signed', 'cookie-prueba', {maxAge: 5000, signed: true})
  res.cookie('tda-251', 'cookie-prueba', {maxAge: 3000});
  res.render('home', { title: 'Home page' });
});

router.get('/cookie-sessions', function (req, res, next) {
  req.session.views = (req.session.views || 0) + 1
  res.end(req.session.views + ' visitas')
})

module.exports = router;
 