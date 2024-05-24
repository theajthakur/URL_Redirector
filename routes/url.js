const express = require("express");
const {
  handleGenerateNewShortURL,
  handleAnalytic,
} = require("../controllers/url");
const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get("/analytic/:id", handleAnalytic);
module.exports = router;
