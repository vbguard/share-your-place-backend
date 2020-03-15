const router = require("express").Router();
const { check } = require("express-validator");
const {
  getUsers,
  signup,
  login,
  logout
} = require("../controllers/users.controller");

router
  .get("/", getUsers)
  .post(
    "/signup",
    [
      check("name")
        .not()
        .isEmpty(),
      check("email")
        .normalizeEmail()
        .isEmail(),
      check("password").isLength({ min: 5 })
    ],
    signup
  )
  .post("/login", login)
  .get("/logout", logout);

module.exports = router;
