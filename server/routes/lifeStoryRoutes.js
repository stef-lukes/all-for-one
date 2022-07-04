const express = require("express");
const router = express.Router();
const {
  getLifeStory,
  createLifeStory,
  updateLifeStory,
  deleteLifeStory,
} = require("../controllers/lifeStoryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getLifeStory).post(createLifeStory);
router
  .route("/:lifeStory_id")
  .put(protect, updateLifeStory)
  .delete(deleteLifeStory);
module.exports = router;
