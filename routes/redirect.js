const express = require("express");
const { handleRedirect } = require("../controllers/url");
const router = express.Router();
router.get("/:id", handleRedirect);
module.exports = router;
