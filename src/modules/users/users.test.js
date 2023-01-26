const request = require("supertest");
const User = require("../users/users.model");
const app = require("../../../server");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

describe("POST /login", () => {
  let email;
  let password;
  let user;
  let username;
  let hash;

  beforeAll(async () => {
    email = "test@example.com";
    password = "password123";
    username = "testName";
    hash = await bcrypt.hash("password123", 10);
    user = await User.create({
      email,
      password: hash,
      username,
    });
  });

  it("should login a user with valid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/users/login")
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toBeDefined();
  });

  it("should return error if email is not provided", async () => {
    const res = await request(app)
      .post("/api/v1/users/login")
      .send({ password });

    expect(res.status).toBe(400);
    expect(res.error.text).toContain(
      "Error: Please provide email and password!"
    );
  });

  it("should return error if password is not provided", async () => {
    const res = await request(app).post("/api/v1/users/login").send({ email });

    expect(res.status).toBe(400);
    expect(res.error.text).toContain(
      "Error: Please provide email and password!"
    );
  });

  it("should return error if email is incorrect", async () => {
    const res = await request(app)
      .post("/api/v1/users/login")
      .send({ email: "wrong@example.com", password });

    expect(res.status).toBe(400);
    expect(res.error.text).toContain("Error: Incorrect email !");
  });

  it("should return error if password is incorrect", async () => {
    
    const res = await request(app)
      .post("/api/v1/users/login")
      .send({ email, password: "wrongpassword" });
    expect(res.status).toBe(400);
    expect(res.error.text).toContain("Incorrect password !");


  });

  afterAll(async () => {
    await User.deleteMany({});
    mongoose.disconnect();
    app.close();
  });
});
