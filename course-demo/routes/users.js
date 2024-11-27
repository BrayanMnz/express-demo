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

router.get('/login', function (req, res) {
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
    const user = await models.User.findOne({ where: { email: email } })

    if (bcrypt.compareSync(passwd, user.password)) {
      console.log(`El usuario ${user.name} ha iniciado sesion`);
      res.cookie('login', email, { maxAge: 1200000 });
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
    await models.User.create(
      {
        name: name,
        email: email,
        password: passwd,
        address: address,
        phoneNumber: phone,
        terms: terms
      })

    return res.send({ result: 'success' });
  } catch (error) {
    res.status(500).send(error.message);
  }
  return res.send({ result: 'failed' });
})

router.get('/:id', async function (req, res) {

  let user = await models.User.findByPk(req.params.id);
  if (!user) {
    return res.sendStatus(404);
  }
  res.json(user.toJSON());
});

// curl -X DELETE localhost:3000/users/mia.johnson@test.com
router.delete('/:email', async (req, res) => {

  let user = await models.User.findOne({ where: { email: req.params.email } });
  await user.destroy();

  //await models.User.destroy({ where: { email: req.params.email }});
  res.send('Usuario eliminado correctamente');
})

// curl -X PUT localhost:3000/users/mia.johnson@test.com?name=Pepe
router.put('/:email/:name', async (req, res) => {

  await models.User.update({ name: req.params.name },
    { where: { email: req.params.email } });

  //const user = await models.User.findOne({ where: { email: email } }) 
  //user.name = req.params.name;
  //await user.save();

  res.send('Usuario modificado correctamente');
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
