var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  if (req.body.username && req.body.userPassword) {
      console.log(req.body);
      req.session.userName = user.username;
      return res.redirect(303, "/");
  }
  return res.redirect(303, "/login/bad-login");
});

router.get("/bad-login", function (req, res, next) {
  res.send("Usuario incorrecto, inicie sesion nuevamente");
});

module.exports = router;