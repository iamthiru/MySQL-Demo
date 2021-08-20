require("dotenv").config();
const express = require("express");
const router = require("./src/router/emp.router");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world !" });
});
app.use("/api", router);
app.listen(process.env.APP_PORT, () => {
  console.log("Server listening on port " + process.env.APP_PORT);
});
