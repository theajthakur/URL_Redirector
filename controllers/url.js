const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required!" });
  const shortID = shortid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleRedirect(req, res) {
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const userAgent = req.headers["user-agent"];

  try {
    const data = await URL.findOneAndUpdate(
      {
        shortId: req.params.id,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
            ipAddress: ipAddress,
            UserAgent: userAgent,
          },
        },
      }
    );
    if (data) {
      const redirectURL = data.redirectURL;
      // Redirect to the found URL
      return res.redirect(redirectURL);
    } else {
      // Handle case where no document is found
      return res.status(404).json({ error: "No Link found!" });
    }
  } catch (error) {
    // Handle any other errors
    return res.status(500).json({ error: "Server Error" });
  }
}

async function handleAnalytic(req, res) {
  const shortId = req.params.id;
  const data = await URL.findOne({ shortId });
  if (data) {
    return res.json({
      totalclicks: data.visitHistory.length,
      analytics: data.visitHistory,
    });
  } else {
    return res.status(404).json({ error: "no link found!" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirect,
  handleAnalytic,
};
