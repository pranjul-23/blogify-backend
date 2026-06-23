const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.matchPassword(email, password);
  console.log("user", user);

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
