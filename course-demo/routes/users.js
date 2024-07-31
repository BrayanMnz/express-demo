var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.render('forms/user-signup', {
    title: 'Registro de Usuarios',
    layout: './layouts/forms-layout'
  });
});

router.get('/signup/file', function (req, res, next) {
  res.render('forms/user-signup-with-file', {
    title: 'Registro de Usuarios',
    layout: './layouts/forms-layout'
  });
});

router.post('/signup/file', function (req, res, next) {
  const form = new multiparty.Form();

  /* 
  Estamos utilizando el método parse de multiparty para procesar los datos 
  de la petición y dividirlos en (fields, files). 
  
  Este método almacenará los archivos en un directorio temporal en el servidor 
  y esa información se devolverá en el arreglo files.
  */
  form.parse(req, (err, fields, files) => {
    //Si ocurre un error leyendo el formulario, retorna 500 y el mensaje de error.
    if (err) return res.status(500).send({ error: err.message });

    //Si no hay error, procesamos el formulario.
    console.log("Campos recibidos : ", fields);
    console.log("Archivos : ", files);

    res.redirect(303, '/users/signup/thank-you');
  });
});

  router.get('/signup/thank-you', function (req, res, next) {
    res.render('forms/user-signup-thank-you', {
      title: 'Gracias',
      layout: './layouts/forms-layout'
    });
  });

  router.post('/api/user-signup/process', (req, res) => {
    console.log(req.body);
    return res.send({ result: 'success' });
  })

  module.exports = router;
