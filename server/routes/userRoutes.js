const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.route("/").get(getUsers).post(setUser);
router.route("/:user_id").put(updateUser).delete(deleteUser);

module.exports = router;
