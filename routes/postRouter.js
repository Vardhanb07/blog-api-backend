const { Router } = require("express");
const passport = require("passport");
const commentRouter = require("./commentRouter");
const postController = require("../controllers/postController");
require("../middlewares/passportConfig");

const postRouter = Router();

postRouter.get("/", postController.sendPosts);
postRouter.get("/:id", postController.sendPostById);
postRouter.use("/:id/comment", commentRouter);

postRouter.use(passport.authenticate("jwt", { session: false }));
postRouter.post("/", postController.createPost);

module.exports = postRouter;
