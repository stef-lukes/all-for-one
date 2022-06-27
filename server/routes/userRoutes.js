const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.get("/", getUsers);

router.post("/", setUser);

router.put("/:user_id", updateUser);

router.delete("/:user_id", deleteUser);

module.exports = router;
