const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  inviteUser,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getUsers).post(setUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe);
router.route("/adduser").post(inviteUser);
router.route("/:user_id").put(updateUser).delete(deleteUser);

module.exports = router;
