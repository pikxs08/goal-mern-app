const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// Get goals with comments
const getGoals = asyncHandler(async (req, res) => {
  let goals;

  // Check if the user is a mentor
  if (req.user.isMentor) {
    // If user is a mentor, fetch all goals with comments from the database
    goals = await Goal.find({})
      .populate("comments.user", "name")
      .populate("comments.mentor", "name");
  } else {
    // Otherwise, fetch only the goals belonging to the requesting user and populate comments accordingly
    goals = await Goal.find({ user: req.user.id })
      .populate("comments.user", "name")
      .populate("comments.mentor", "name");
  }

  res.status(200).json(goals);
});

// Add comment to a goal
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { goalId } = req.params;

  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  // Check if the user is the owner of the goal or a mentor
  const user = await User.findById(req.user.id);

  if (!user || (!user.isMentor && goal.user.toString() !== user.id)) {
    res.status(401);
    throw new Error("You are not authorized to add comments to this goal");
  }

  // Add the comment to the goal
  const newComment = { user: req.user.id, text: req.body.text };
  goal.comments.push(newComment);
  await goal.save();

  res.status(201).json(goal.comments);
});

// Get latest comments
const fetchLatestComments = asyncHandler(async (req, res) => {
  try {
    const latestComments = await Goal.find()
      .sort({ createdAt: -1 })
      .limit(50) // Adjust this limit as per your requirement
      .populate("comments.user", "name")
      .populate("comments.mentor", "name");

    res.status(200).json(latestComments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest comments" });
  }
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.targetDate) {
    res.status(400);
    throw new Error("Please provide a goal and target date!");
  }

  const goal = await Goal.create({
    text: req.body.text,
    targetDate: req.body.targetDate,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

const putGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!");
  }

  // Check if the user is the owner of the goal
  const user = await User.findById(req.user.id);

  // If not the owner of the goal or a mentor
  if (!user || (!user.isMentor && goal.user.toString() !== user.id)) {
    res.status(401);
    throw new Error("You are not authorized to update this goal!");
  }

  const updatedFields = {
    text: req.body.text,
    targetDate: req.body.targetDate,
    completed: req.body.completed,
    needsHelp: req.body.needsHelp,
  };

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    updatedFields,
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

  // Check if the user is the owner of the goal or a mentor
  const user = await User.findById(req.user.id);

  // If not the owner of the goal or a mentor
  if (!user || (!user.isMentor && goal.user.toString() !== user.id)) {
    res.status(401);
    throw new Error("You are not authorized to delete this goal!");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  putGoal,
  addComment,
  deleteGoal,
  fetchLatestComments,
};
