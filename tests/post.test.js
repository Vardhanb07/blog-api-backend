"use strict";

const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("should redirect to /post", async () => {
    const response = await request(app).get("/");
    expect(response.headers.location).toMatch(/\/post/);
  });
});

describe("GET /post", () => {
  it("should return all the posts in the db", async () => {
    const response = await request(app).get("/post");
    expect(response.body.data).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /post/:id", () => {
  it("should return null when a post non-existent id is provided", async () => {
    const response = await request(app).get("/post/1");
    expect(response.body.data).toBeNull();
  });
});
