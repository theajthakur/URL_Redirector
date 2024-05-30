const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleGoogleLogin,
} = require("../controllers/user");
const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/google-login", handleGoogleLogin);

module.exports = router;
