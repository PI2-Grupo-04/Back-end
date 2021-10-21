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

let token = "";

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

    token = response.body.data.token;
  });

  it("should retrieve logged in user", async () => {
    const response = await supertest(app.app)
      .get("/auth/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
  });
});
