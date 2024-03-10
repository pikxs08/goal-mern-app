const jwt = require("jsonwebtoken");

const generateToken = (id, isMentor) => {
  return jwt.sign({ id, isMentor }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };
