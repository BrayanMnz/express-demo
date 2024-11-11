var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const path = require('path')
const fs = require('fs/promises')

router.get('/', async function (req, res, next) {
  try {
    const users = await getUsers(res);
    res.render('users', {
      title: 'Lista de Usuarios',
      user: users
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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

router.post('/api/user-signup/process', async (req, res) => {
  const name = req.body.name
  const passwd = req.body.password
  const email = req.body.email
  const address = req.body.address
  const phone = req.body.phoneNumber
  const terms = req.body.terms

  try {
    const users = await getUsers(res);
    let user = {
      "id": users.length,
      "name": name,
      "email": email,
      "password": passwd,
      "address": address,
      "phoneNumber": phone,
      "terms": terms
    }
    users.push(user);

    // Escribiendo al archivo users.json
    const filePath = path.join(__dirname, '..', 'data', 'users.json');

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(`Nuevo usuario ${name} ha sido agregado al archivo`);
    });

    res.status(200).send(`Nuevo usuario ${name} ha sido agregado al archivo`);
  } catch (error) {
    res.status(500).send(error.message);
  }
  return res.send({ result: 'success' });
})

async function getUsers() {
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
