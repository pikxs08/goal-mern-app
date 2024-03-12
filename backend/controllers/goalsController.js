const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// Get goals with comments
const getGoals = asyncHandler(async (req, res) => {
  let goals;

  // Check query parameters to determine the type of goals to fetch, if empty, fetch all goals
  const filter = req.query.filter || "all";

  // Fetch goals based on the filter
  switch (filter) {
    case "all":
      // Fetch all goals for mentors, only user's goals for basic users
      goals = req.user.isMentor
        ? await Goal.find({})
        : await Goal.find({ user: req.user.id });
      break;
    case "completed":
      // Fetch completed goals for mentors, only user's completed goals for basic users
      goals = req.user.isMentor
        ? await Goal.find({ completed: true })
        : await Goal.find({ user: req.user.id, completed: true });
      break;
    case "in-progress":
      // Fetch incomplete goals for mentors, only user's incomplete goals for basic users
      goals = req.user.isMentor
        ? await Goal.find({ completed: false })
        : await Goal.find({ user: req.user.id, completed: false });
      break;
    case "mentor":
      // Fetch all goals for the mentor signed in
      goals = await Goal.find({ user: req.user.id });
      break;
    default:
      // By default, fetch goals for the requesting user
      goals = req.user.isMentor
        ? await Goal.find({})
        : await Goal.find({ user: req.user.id });
  }

  res.status(200).json(goals);
});

// Add comment to a goal
const addComment = asyncHandler(async (req, res) => {
  const { name, text } = req.body;
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
  const newComment = { name: name, text: text };
  goal.comments.push(newComment);
  await goal.save();

  res.status(201).json(goal.comments);
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
};
