var express = require('express');
var router = express.Router();

const students = ['Damilka', 'Edwin', '', 'Emmanuel', 'Gleudy', 'Laura', null, 'Miguel', 'Yasser']

const people = {
    person: {
        firstname: "Pepe",
        lastname: "Perez",
    },
}


router.get('/', function(req, res, next) {
  res.render('./handlebars-examples/handlebars-examples', {name: 'Brayan', name2: '<b>Brayan</b>', title: 'Ejemplos de Handlebars'})
});

router.get('/bloque/each', function(req, res, next) {
    res.render('./handlebars-examples/blocks', {student: students})
});

router.get('/bloque/with', function(req, res, next) {
    res.render('./handlebars-examples/with-block', {student: people})
});


module.exports = router;
