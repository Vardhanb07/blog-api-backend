const prisma = require("../db/client");

async function sendPosts(req, res) {
  const data = await prisma.posts.findMany();
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
    },
  });
  res.status(200).send({
    data: data,
  });
}

module.exports = {
  sendPosts,
  sendPostById,
};
