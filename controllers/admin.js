const URL = require("../models/url");

async function adminHome(req, res) {
  return res.json({ status: "success", message: "Hello Admin" });
}

async function adminUrls(req, res) {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
    username: req.user?.name,
  });
}

module.exports = { adminHome, adminUrls };
