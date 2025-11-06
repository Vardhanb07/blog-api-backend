"use strict";

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const postRouter = require("./routes/postRouter");
const loginRouter = require("./routes/loginRouter");
require("dotenv").config({ quiet: true });

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(
  morgan("tiny", {
    stream: fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {
      flags: "a",
    }),
  })
);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.redirect("/post");
});
app.use("/post", postRouter);
app.use("/login", loginRouter);
app.use((req, res) => {
  res.status(404).json({ message: "resource not found" });
});

module.exports = app;
