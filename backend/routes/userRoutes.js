const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Register new user
router.post("/", registerUser);
// Login user
router.post("/login", loginUser);
// Get user profile
router.get("/me", protect, getMe);

module.exports = router;
