const fs = require("fs");
const { validateToken } = require("../services/authentication");

const logReqRes = (filename) => {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n ${Date.now()}: ${req.ip} ${req.method} ${req.path}\n`,
      (err, data) => {
        next();
      },
    );
  };
};

function checkAuthentication(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const user = validateToken(token);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  logReqRes,
  checkAuthentication,
};
