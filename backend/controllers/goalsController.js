const asyncHandler = require("express-async-handler");

// Get, post, put, delete goals
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals!" });
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    return res.status(400);
    throw new Error("Please provide a goal!");
  }

  res.status(200).json({ message: "Set goals!" });
});

const putGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}!` });
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}!` });
});

module.exports = { getGoals, setGoal, putGoal, deleteGoal };
