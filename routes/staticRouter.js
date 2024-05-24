const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
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

module.exports = router;
