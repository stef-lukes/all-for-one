const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  loginUser,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getUsers).post(setUser);
router.route("/login").post(loginUser);

module.exports = router;
