const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  putGoal,
  addComment,
  deleteGoal,
} = require("../controllers/goalsController");
const { protect } = require("../middleware/authMiddleware");

// GET user goals
router.get("/", protect, getGoals);
// POST create goal
router.post("/", protect, setGoal);
// PUT update goal
router.put("/:id", protect, putGoal);
// PUT add a comment to a goal
router.put("/:goalId/comment", protect, addComment);
// DELETE goal
router.delete("/:id", protect, deleteGoal);

module.exports = router;
