const prisma = require("../db/client");

async function sendPostComments(req, res) {
  const id = Number(req.baseUrl.split("/")[2]);
  const data = await prisma.comments.findMany({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    data: data,
  });
}

async function sendPostCommentsById(req, res) {
  let { commentId } = req.params;
  commentId = Number(commentId);
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
  id = Number(id);
  const { userId } = await prisma.users.create({
    data: {
      email: email,
    },
  });
  await prisma.comments.create({
    content: content,
    userId: userId,
  });
  res.status(201).json({
    message: "comment created",
  });
}

module.exports = {
  sendPostComments,
  sendPostCommentsById,
  postComment,
};
