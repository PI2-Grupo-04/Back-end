import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/server";

beforeAll(async () => {
  const url = "mongodb://root:password@mongo:27017/";
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("AuthController", () => {
  it("should be able to register", async () => {
    const response = await supertest(app.app)
      .post("/auth/register")
      .send({
        username: "user",
        email: "user@user.com",
        password: "password",
      })
      .expect(200);

    expect(response.body.status).toBe("success");
  });

  it("should be able to log in", async () => {
    const response = await supertest(app.app)
      .post("/auth/login")
      .send({
        username: "user",
        password: "password",
      })
      .expect(200);

    expect(response.body.status).toBe("success");
  });
});
