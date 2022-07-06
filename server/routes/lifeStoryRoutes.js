const express = require("express");
const router = express.Router();
const {
  getLifeStory,
  updateLifeStoryAnswer,
  deleteLifeStory,
} = require("../controllers/lifeStoryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getLifeStory);
router.route("/:category").put(updateLifeStoryAnswer).delete(deleteLifeStory);
module.exports = router;
