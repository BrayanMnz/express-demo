const express = require('express');
const path = require('path')
const { getQuote } = require('./quote');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.set('view options', {layout: './layouts/main'})
app.use(express.static(__dirname + '/public'))

var usersRouter = require('./routes/users');


app.get('/', function(req, res) {
    res.render('home');
})

app.get('/about', function(req, res) {
    randomQuote = getQuote()
    res.render('about', {quote: randomQuote});
})

app.get('/about/description', function(req, res) {
    res.send('Página descripción ');
})

app.get('/about*', function(req, res) {
    res.send('Página about con wildcard');
})

app.use('/users', usersRouter);

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
  })

app.listen(3000, function() {
    console.log('Ejemplo de aplicación en EXPRESS JS, escuchando en el puerto 3000...')
});
