import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/server";

import User from "../src/models/User";
import Restaurant from "../src/models/Restaurant";

let token = "";

beforeAll(async () => {
  const url = "mongodb://root:password@mongo:27017/";
  await mongoose.connect(url, { useNewUrlParser: true });

  await User.create({
    username: "user",
    email: "user@user.com",
    password: "password",
  });

  const response = await supertest(app.app).post("/auth/login").send({
    username: "user",
    password: "password",
  });

  token = response.body.data.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("RestaurantController", () => {
  it("should be able to create", async () => {
    const response = await supertest(app.app)
      .post("/restaurant")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "McBonalds" })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Restaurant Created");
  });

  it("should be able to retrieve", async () => {
    const restaurant = await Restaurant.findOne({ name: "McBonalds" });

    const response = await supertest(app.app)
      .get(`/restaurant/${restaurant.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
  });

  it("should be able to update", async () => {
    const restaurant = await Restaurant.findOne({ name: "McBonalds" });

    const response = await supertest(app.app)
      .put(`/restaurant/${restaurant.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "McBonaldss" })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Restaurant Updated");
  });

  it("should be able to delete", async () => {
    const restaurant = await Restaurant.findOne({ name: "McBonaldss" });

    const response = await supertest(app.app)
      .delete(`/restaurant/${restaurant.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Restaurant Deleted");
  });
});
