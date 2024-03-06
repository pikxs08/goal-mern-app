const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(" ")[1]; // Split at the space and get the second element which is the token

      // Verify token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the token and attach it to the request object so that we can use it in the protected routes
      req.user = await User.findById(decoded.id).select("-password"); // select("-password") is used to not return the password
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
