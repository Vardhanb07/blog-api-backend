const express = require("express");
const cors = require("cors");
const passport = require("passport");
const postRouter = require("./routes/postRouter");
const loginRouter = require("./routes/loginRouter");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
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
