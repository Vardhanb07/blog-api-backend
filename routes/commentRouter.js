const { Router } = require("express");
const commentController = require("../controllers/commentController");

const commentRouter = Router();

commentRouter.get("/", commentController.sendPostComments);
commentRouter.get("/:commentId", commentController.sendPostCommentsById);
commentRouter.post("/", commentController.postComment);

module.exports = commentRouter;
