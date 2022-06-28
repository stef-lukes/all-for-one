const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");

router.route("/").get(getUsers).post(setUser);
router.route("/login").post(loginUser);
router.route("/me").get(getMe);
router.route("/:user_id").put(updateUser).delete(deleteUser);

module.exports = router;
