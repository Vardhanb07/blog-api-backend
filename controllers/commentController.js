const prisma = require("../db/client");

async function sendPostComments(req, res) {
  let { id } = req.params;
  id = Number(id);
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
  commentId = Number(id);
  const data = await prisma.comments.findUnique({
    where: {
      commentId: commentId,
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
    msg: "comment created",
  });
}

module.exports = {
  sendPostComments,
  sendPostCommentsById,
  postComment,
};
