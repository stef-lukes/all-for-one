const express = require("express");
const router = express.Router();
const {
  getDailyLog,
  setDailyLogEntry,
  updateDailyLogEntry,
  deleteDailyLogEntry,
} = require("../controllers/dailyLogController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDailyLog).post(protect, setDailyLogEntry);
router
  .route("/:dailyLogEntry_id")
  .put(protect, updateDailyLogEntry)
  .delete(protect, deleteDailyLogEntry);

module.exports = router;
