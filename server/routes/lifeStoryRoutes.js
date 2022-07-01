const express = require("express");
const router = express.Router();
const {
  getLifeStory,
  createLifeStory,
  updateLifeStory,
  deleteLifeStory,
} = require("../controllers/lifeStoryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getLifeStory).post(protect, createLifeStory);
router
  .route("/:lifeStory_id")
  .put(protect, updateLifeStory)
  .delete(protect, deleteLifeStory);
module.exports = router;
