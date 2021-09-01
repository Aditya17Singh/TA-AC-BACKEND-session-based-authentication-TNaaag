var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/", (req, res) => {
  res.send("welcome");
});

module.exports = router;
