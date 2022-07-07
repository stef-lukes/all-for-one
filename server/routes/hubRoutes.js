const express = require("express");
const router = express.Router();
const {
  setHub,
  updateUser,
  deleteUser,
  getMe,
  inviteUser,
  setInvitedUser,
  getHubNames,
  getUsers,
} = require("../controllers/hubController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(setHub);
router.route("/users").post(getUsers);
router.route("/hubnames").post(getHubNames);
router.route("/:user_id").put(updateUser).delete(deleteUser);
router.route("/me").get(protect, getMe);
router.route("/addusers").post(inviteUser, setInvitedUser);

module.exports = router;
