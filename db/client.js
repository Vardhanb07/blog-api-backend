"use strict";

const { PrismaClient } = require("../generated/prisma");
require("dotenv").config({ quiet: true });

const databaseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL;

const client = new PrismaClient({
  datasources: {
    db: {
      url: databaseURL,
    },
  },
});

module.exports = { client };
