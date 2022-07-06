const express = require("express");
const router = express.Router();
const {
  setHub,
  updateUser,
  deleteUser,
  getMe,
  inviteUser,
} = require("../controllers/hubController");

router.route("/").post(setHub);
router.route("/:user_id").put(updateUser).delete(deleteUser);
router.route("/me").get(protect, getMe);
router.route("/addusers").post(inviteUser);

module.exports = router;
