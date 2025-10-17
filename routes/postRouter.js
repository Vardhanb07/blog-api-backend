const { Router } = require("express");
const commentRouter = require("./commentRouter");
const postController = require("../controllers/postController");

const postRouter = Router();

postRouter.use("/comment", commentRouter);
postRouter.get("/", postController.sendPosts);
postRouter.get("/:id", postController.sendPostById);

module.exports = postRouter;
