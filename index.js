const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.json({ test: "test" });
});

const port = process.env.PORT || 20000;

app.listen(port, () => {
  console.log(`localhost: http://localhost:${port}`);
});
