const express = require("express");
const cors = require("cors");
require("dotenv").config();
const postRouter = require("./routes/postRouter");

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/post", postRouter);

app.use((req, res) => {
  res.status(404).json({ msg: "resource not found" });
});

const port = process.env.PORT || 20000;

app.listen(port, () => console.log(`localhost: http://localhost:${port}`));
