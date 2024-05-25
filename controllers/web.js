const { getUser } = require("../service/auth");

async function userProfile(req, res) {
  const userData = {
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  };
  res.json(userData);
}

module.exports = { userProfile };
