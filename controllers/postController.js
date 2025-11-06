"use strict";

const { client } = require("../db/client");

async function sendPosts(req, res) {
  let { published } = req.query;
  if (!published || published === "true") published = true;
  if (published === "false") published = false;
  const data = await client.posts.findMany({
    where: {
      published: published,
    },
  });
  res.status(200).json({
    data: data,
  });
}

async function sendPostById(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const data = await client.posts.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    data: data,
  });
}

async function createPost(req, res) {
  const { title, content, published } = req.body;
  await client.posts.create({
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  res.status(201).json({
    message: "post created successfully",
  });
}

async function deletePostById(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  await client.comments.deleteMany({
    where: {
      postId: id,
    },
  });
  await client.posts.delete({
    where: {
      id: id,
    },
  });
  res.status(204).json({
    message: "resource deleted successfully",
  });
}

async function updatePostById(req, res) {
  let { id } = req.params;
  id = parseInt(id);
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
