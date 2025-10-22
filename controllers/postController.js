const prisma = require("../db/client");

async function sendPosts(req, res) {
  const data = await prisma.posts.findMany({
    where: {
      published: true,
    },
  });
  res.status(200).json({
    data: data,
  });
}

async function sendPostById(req, res) {
  let { id } = req.params;
  id = Number(id);
  const data = await prisma.posts.findUnique({
    where: {
      id: id,
      published: true,
    },
  });
  res.status(200).send({
    data: data,
  });
}

async function createPost(req, res) {
  const { title, content, published } = req.body;
  await prisma.posts.create({
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  req.status(201).json({
    message: "post created successfully",
  });
}

async function deletePostById(req, res) {
  let { id } = req.params;
  id = Number(id);
  await prisma.comments.delete({
    where: {
      postId: id,
    },
  });
  await prisma.posts.delete({
    where: {
      id: id,
    },
  });
  res.status(204).json({
    message: "resource deleted successfully",
  });
}

//for drafts

async function updatePostById(req, res) {
  let { id } = req.params;
  id = Number(id);
  const { title, content, published } = req.body;
  await prisma.posts.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  res.status(204).json({
    message: "post updated successfully",
  });
}

module.exports = {
  sendPosts,
  sendPostById,
  createPost,
  deletePostById,
  updatePostById,
};
