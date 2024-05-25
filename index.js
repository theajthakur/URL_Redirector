const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const app = express();

const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const port = 8000;

const urlRoute = require("./routes/url");
const RedirectRoute = require("./routes/redirect");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const webRoute = require("./routes/web");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to Mongoose!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url/", restrictToLoggedinUserOnly, urlRoute);
app.use("/web/", restrictToLoggedinUserOnly, webRoute);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouter);
app.use("/r/", RedirectRoute);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
