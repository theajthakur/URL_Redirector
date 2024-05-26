const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
    username: req.user?.name,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
