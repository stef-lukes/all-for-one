const express = require("express");
const router = express.Router();
const {
  getLifeStory,
  updateLifeStory,
  deleteLifeStory,
} = require("../controllers/lifeStoryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getLifeStory);
router.route("/:category").put(updateLifeStory).delete(deleteLifeStory);
module.exports = router;
