const express = require("express");
const adminRouter = express.Router();
const { adminHome, adminUrls } = require("../controllers/admin");
adminRouter.get("/", adminHome);
adminRouter.get("/url", adminUrls);
module.exports = { adminRouter };
