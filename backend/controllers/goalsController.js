const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const userModel = require("../models/userModel");

// Get, post, put, delete goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a goal!");
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.status(200).json(goal);
});

const putGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!");
  }

  // Check if the user is the owner of the goal
  const user = await userModel.findById(req.user.id);

  // If not the owner of the goal
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // Logged in user id matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this goal!");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!");
  }

  // Check if the user is the owner of the goal
  const user = await userModel.findById(req.user.id);

  // If not the owner of the goal
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // Logged in user id matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this goal!");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, putGoal, deleteGoal };
