var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log(req.cookies);
    res.render('cookies', {cookie: req.cookies});
})
  
module.exports = router;
