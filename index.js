const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const app = express();

const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const port = 8000;

const urlRoute = require("./routes/url");
const RedirectRoute = require("./routes/redirect");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const webRoute = require("./routes/web");
const { adminRouter } = require("./routes/admin");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to Mongoose!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url/", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/admin/", restrictTo(["ADMIN"]), adminRouter);
app.use("/web/", webRoute);
app.use("/user", userRouter);
app.use("/", staticRouter);
app.use("/r/", RedirectRoute);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
