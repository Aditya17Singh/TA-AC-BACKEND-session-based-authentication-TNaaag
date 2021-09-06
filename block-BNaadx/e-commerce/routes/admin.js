var express = require("express");
var router = express.Router();

var User = require("../model/Admin");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin");
});

router.get("/register", (req, res, next) => {
  res.render("register", { error: req.flash("error")[0] });
});
router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      if (err.name === "MongoError") {
        req.flash("error", "This email is taken");
        return res.redirect("/users/register");
      }
      return res.json({ err });
    }
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res, next) => {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

router.post("/login", (req, res) => {
  var { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    req.flash("error", "Email/Password required");
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    console.log(req.body, user);
    if (err) return next(err);
    //no user
    if (!user) {
      return res.redirect("/users/login");
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }
      //persisit logged in user info
      req.session.userId = user.id;
      res.redirect("/dashboard");
    });
  });
});

module.exports = router;
