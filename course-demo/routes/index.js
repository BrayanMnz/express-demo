var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forms/login', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('forms/signup', { title: 'Registrarse' });
});

module.exports = router;
