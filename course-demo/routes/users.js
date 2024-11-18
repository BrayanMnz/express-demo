var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const path = require('path')
const fs = require('fs/promises')
const bcrypt = require('bcryptjs');


const models = require("../models");

router.get('/', async function (req, res, next) {
  if (req.cookies.login) {
    try {
      const users = await models.User.findAll();
      res.render('users', {
        title: 'Lista de Usuarios',
        user: users.map(user => user.toJSON())
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.redirect(303, '/users/login');
  }
});
    


router.get('/login', function (req, res, next) {
  res.render('forms/user-login', {
    title: 'Inicio de sesion de',
    layout: './layouts/forms-layout'
  });
});

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

router.post('/login', async (req, res) => {
  const passwd = req.body.password
  const email = req.body.email

  try {
    const user = await models.User.findOne({ where: { email: email}})
    if (bcrypt.compareSync(passwd, user.password)) {
      console.log(`El usuario ${user.name} ha iniciado sesion`);
      res.cookie('login', email, { maxAge: 60000 });
      res.redirect(303, '/');
    } else {
      return res.render('bad-login', { email: email })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/api/user-signup/process', async (req, res) => {
  const name = req.body.name
  const passwd = req.body.password
  const email = req.body.email
  const address = req.body.address
  const phone = req.body.phoneNumber
  const terms = req.body.terms

  try {
    return res.send({ result: 'success' });
  } catch (error) {
    res.status(500).send(error.message);
  }
  return res.send({ result: 'failed' });
})

async function getUsersFromFile() {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  try {
    const users = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(users);
  } catch (error) {
    console.log(error)
    throw new Error("Users cannot be read", err);
  }
}

module.exports = router;
