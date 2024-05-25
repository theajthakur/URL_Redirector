const express = require("express");
const { userProfile } = require("../controllers/web");

const webRoute = express.Router();

webRoute.get("/profile", userProfile);

module.exports = webRoute;
