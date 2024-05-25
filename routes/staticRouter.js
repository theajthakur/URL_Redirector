const express = require("express");
const URL = require("../models/url");
const { deleteUser } = require("../service/auth");
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

router.get("/logout", (req, res) => {
  const userId = req.cookies.uid;
  deleteUser(userId);
  res.cookie("uid", "", { expires: new Date(0) }).redirect("/");
});

module.exports = router;
