var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('forms/user-signup', {title: 'Registro de Usuarios', layout: './layouts/forms-layout'});
});
router.post('/process', function(req, res, next) {
  console.log(req.body);
  res.redirect(303, '/users');
});


module.exports = router;
