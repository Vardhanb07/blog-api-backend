const express = require("express");
require("dotenv").config();
const postRouter = require("./routes/postRouter");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/post", postRouter);

app.use((req, res) => {
  res.status(404).json({ msg: "resource not found" });
});

const port = process.env.PORT || 20000;

app.listen(port, () => console.log(`localhost: http://localhost:${port}`));
