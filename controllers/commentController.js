"use strict";

const { client } = require("../db/client");

async function sendPostComments(req, res) {
  const id = parseInt(req.baseUrl.split("/")[2]);
  let data, statusCode;
  try {
    data = await client.comments.findMany({
      where: {
        postId: id,
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

async function sendPostCommentsById(req, res) {
  let { commentId } = req.params;
  commentId = parseInt(commentId);
  let data, statusCode;
  try {
    data = await client.comments.findUnique({
      where: {
        id: commentId,
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

async function postComment(req, res) {
  let { id } = req.params;
  let { email, content } = req.body;
  const postId = parseInt(req.baseUrl.split("/")[2]);
  id = Number(id);
  let message, statusCode;
  try {
    const user = await client.users.create({
      data: {
        email: email,
      },
    });
    const userId = user.id;
    await client.comments.create({
      data: {
        content: content,
        postId: postId,
        userId: userId,
      },
    });
    message = "comment created";
    statusCode = 201;
  } catch (e) {
    message = "Api error";
    statusCode = 503;
  }
  res.status(statusCode).json({
    message: message,
  });
}

async function deleteCommentById(req, res) {
  let { commentId } = req.params;
  commentId = parseInt(commentId);
  let message, statusCode;
  try {
    await client.comments.delete({
      where: {
        id: commentId,
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

module.exports = {
  sendPostComments,
  sendPostCommentsById,
  postComment,
  deleteCommentById,
};
