const { Router } = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = Router();

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
