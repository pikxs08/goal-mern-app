const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  putGoal,
  deleteGoal,
} = require("../controllers/goalsController");

router.get("/", getGoals);
router.post("/", setGoal);
router.put("/:id", putGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
