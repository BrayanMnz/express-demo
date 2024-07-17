const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Hola mundo!');
})

app.get('/about', function(req, res) {
    res.send('Página acerca de');
})

app.get('/about/description', function(req, res) {
    res.send('Página descripción ');
})

app.get('/about*', function(req, res) {
    res.send('Página about con wildcard');
})



app.use( (req, res) => {
    res.type("text/plain")
    res.status(404)
    res.send("404 - Recurso no encontrado")
})

app.listen(3000, function() {
    console.log('Ejemplo de aplicación en EXPRESS JS, escuchando en el puerto 3000')
});
