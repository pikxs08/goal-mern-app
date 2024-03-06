const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  putGoal,
  deleteGoal,
} = require("../controllers/goalsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getGoals);
router.post("/", protect, setGoal);
router.put("/:id", protect, putGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;
