const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../middleware/auth");

// Registers new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isMentor } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User already exists with the following email: ${email}`);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isMentor: isMentor || false, // Set isMentor to false if not provided
  });

  if (user) {
    const token = generateToken(user._id, user.isMentor); // Generate token with user ID and role
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isMentor: user.isMentor,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check if user exists by email
  const user = await User.findOne({
    email,
  });

  // Compare password entered with hashed password using bcrypt compare method
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id, user.isMentor); // Generate token with user ID and role
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isMentor: user.isMentor,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Get user data
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isMentor: user.isMentor,
  });
});

module.exports = { registerUser, loginUser, getMe };
