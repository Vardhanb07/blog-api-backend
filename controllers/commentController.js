const prisma = require("../db/client");

async function sendPostComments(req, res) {
  const id = parseInt(req.baseUrl.split("/")[2]);
  const data = await prisma.comments.findMany({
    where: {
      postId: id,
    },
  });
  res.status(200).json({
    data: data,
  });
}

async function sendPostCommentsById(req, res) {
  let { commentId } = req.params;
  commentId = parseInt(commentId);
  const data = await prisma.comments.findUnique({
    where: {
      id: commentId,
    },
  });
  res.status(200).json({
    data: data,
  });
}

async function postComment(req, res) {
  let { id } = req.params;
  let { email, content } = req.body;
  const postId = parseInt(req.baseUrl.split("/")[2]);
  id = Number(id);
  const user = await prisma.users.create({
    data: {
      email: email,
    },
  });
  const userId = user.id;
  await prisma.comments.create({
    data: {
      content: content,
      postId: postId,
      userId: userId,
    },
  });
  res.status(201).json({
    message: "comment created",
  });
}

async function deleteCommentById(req, res) {
  let { commentId } = req.params;
  commentId = parseInt(commentId)
  await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });
  res.status(204).json({
    message: "resource deleted successfully",
  });
}

module.exports = {
  sendPostComments,
  sendPostCommentsById,
  postComment,
  deleteCommentById,
};
