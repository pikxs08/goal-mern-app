const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // for hashing passwords
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

// Registers new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //   check if user exists
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User already exists the following email: ${email}`);
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Authenticate user api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //  check if user exists by email
  const user = await userModel.findOne({
    email,
  });

  //   Compare password entered with Hashedpassword using bcrypt compare method
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Get user data api/users/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await userModel.findById(req.user.id);

  res.status(200).json({
    _id,
    name,
    email,
  });
});

// generate user JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
