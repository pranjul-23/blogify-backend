const { validateToken } = require("../services/authentication");

function checkAuthentication(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const user = validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
