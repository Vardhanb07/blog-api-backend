"use strict";

const { client } = require("../db/client");

async function sendPosts(req, res) {
  let { published } = req.query;
  if (!published || published === "true") published = true;
  if (published === "false") published = false;
  let data, statusCode;
  try {
    data = await client.posts.findMany({
      where: {
        published: published,
      },
    });
    statusCode = 200;
  } catch (e) {
    data = "Api error";
    statusCode = 503;
  }
  res.status(statusCode).json({
    data: data,
  });
}

async function sendPostById(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  let data, statusCode;
  try {
    data = await client.posts.findUnique({
      where: {
        id: id,
      },
    });
    statusCode = 200;
  } catch (e) {
    data = "Api error";
    statusCode = 503;
  }
  res.status(statusCode).json({
    data: data,
  });
}

async function createPost(req, res) {
  const { title, content, published } = req.body;
  let message, statusCode;
  try {
    await client.posts.create({
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
    message = "post created successfully";
  } catch (e) {
    message = "Api error";
    statusCode = 503;
  }
  res.status(statusCode).json({
    message: message,
  });
}

async function deletePostById(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  let message, statusCode;
  try {
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
    message = "resource deleted successfully";
    statusCode = 204;
  } catch (e) {
    message = "Api error";
    statusCode = 503;
  }
  res.status(statusCode).json({
    message: message,
  });
}

async function updatePostById(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const { title, content, published } = req.body;
  let message, statusCode;
  try {
    await client.posts.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
    message = "post updated successfully";
  } catch (e) {
    message = "Api error";
    statusCode = 503;
  }
  res.status(statusCode).json({
    message: message,
  });
}

module.exports = {
  sendPosts,
  sendPostById,
  createPost,
  deletePostById,
  updatePostById,
};
