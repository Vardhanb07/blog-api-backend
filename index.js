const express = require("express");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const postRouter = require("./routes/postRouter");
const loginRouter = require("./routes/loginRouter");
require("dotenv").config();

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/post", postRouter);
app.use("/login", loginRouter);
app.use((req, res) => {
  res.status(404).json({ message: "resource not found" });
});

const port = process.env.PORT || 20000;

app.listen(port, () => console.log(`localhost: http://localhost:${port}`));
