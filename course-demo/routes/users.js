var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.render('forms/user-signup', {
    title: 'Registro de Usuarios',
    layout: './layouts/forms-layout'
  });
});

router.post('/signup', function (req, res, next) {
  console.log(req.body);
  res.redirect(303, '/users/signup/thank-you');
});

router.get('/signup/thank-you', function (req, res, next) {
  res.render('forms/user-signup-thank-you', {
    title: 'Gracias',
    layout: './layouts/forms-layout'
  });
});


module.exports = router;
