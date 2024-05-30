const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    res.render("login", {
      error: "invalid Credentials",
    });
  } else {
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
  }
}

async function handleGoogleLogin(req, res) {
  const { OAuth2Client } = require("google-auth-library");
  const idToken = req.body.idToken;

  try {
    const client = new OAuth2Client(
      "133030192262-sc78lj0ce578mpo3n83shp7vlp4pb4df.apps.googleusercontent.com"
    );
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience:
        "133030192262-sc78lj0ce578mpo3n83shp7vlp4pb4df.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      res.render("login", {
        error: "No account found for google account: " + payload.email,
      });
    } else {
      const token = setUser(user);
      res.cookie("token", token);
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    return res.status(400).json({ status: "error", error: "Invalid ID token" });
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleGoogleLogin,
};
