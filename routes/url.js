const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirect,
  handleAnalytic,
} = require("../controllers/url");
const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get("/:id", handleRedirect);
router.get("/analytic/:id", handleAnalytic);
module.exports = router;
