const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

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
  const { name, email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    res.render("login", {
      error: "invalid Credentials",
    });
  } else {
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
