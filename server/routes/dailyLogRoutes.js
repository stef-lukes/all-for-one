const express = require("express");
const router = express.Router();
const {
  getDailyLog,
  setDailyLogEntry,
  updateDailyLogEntry,
  deleteDailyLogEntry,
} = require("../controllers/dailyLogController");

router.route("/").get(getDailyLog).post(setDailyLogEntry);
router
  .route("/:dailyLogEntry_id")
  .put(updateDailyLogEntry)
  .delete(deleteDailyLogEntry);

module.exports = router;
