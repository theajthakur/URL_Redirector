const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const app = express();
const URL = require("./models/url");

const staticRouter = require("./routes/staticRouter");
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to Mongoose!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url/", urlRoute);
app.use("/", staticRouter);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
