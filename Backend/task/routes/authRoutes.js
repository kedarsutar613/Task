const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  signout,
  addBook,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", signout);
router.post("/addBook", addBook);

module.exports = router;
