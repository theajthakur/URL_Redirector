const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const app = express();
const port = 8000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to Mongoose!");
});

app.use(express.json());
app.use("/url/", urlRoute);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
