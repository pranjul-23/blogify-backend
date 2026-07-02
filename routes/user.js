const { Router } = require("express");
const { checkAuthentication } = require("../middlewares");
const {
  handleUserSignup,
  handleUserLogin,
  getCurrentUser,
  handleUserLogout,
} = require("../controllers/user");

const router = Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/current-user", checkAuthentication, getCurrentUser);
router.post("/logout", handleUserLogout);

module.exports = router;
