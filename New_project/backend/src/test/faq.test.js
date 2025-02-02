const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});

describe("FAQ API Tests", () => {
  it("should create a new FAQ", async () => {
    const res = await request(app).post("/api/faqs").send({
      question: "What is Node.js?",
      answer: "Node.js is a JavaScript runtime environment.",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.faq).toHaveProperty("question", "What is Node.js?");
  });

  it("should fetch FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toBe(200);
  });
});
