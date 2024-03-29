import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/server";

import User from "../src/models/User";
import Restaurant from "../src/models/Restaurant";
import Menu from "../src/models/Menu";

let token = "";
let restaurant = null;

beforeAll(async () => {
  const url = "mongodb://root:password@mongo:27017/";
  await mongoose.connect(url, { useNewUrlParser: true });

  const user = await User.create({
    username: "user",
    email: "user@user.com",
    password: "password",
  });

  restaurant = await Restaurant.create({ name: "McBonalds" });
  user.restaurants.push(restaurant);
  user.save();

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

describe("MenuController", () => {
  it("should be able to create", async () => {
    const response = await supertest(app.app)
      .post(`/restaurant/${restaurant.id}/menu`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Burgers" })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Menu Created");
  });

  it("should be able to retrieve", async () => {
    const menu = await Menu.findOne({ name: "Burgers" });

    const response = await supertest(app.app)
      .get(`/menu/${menu.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
  });

  it("should be able to list", async () => {
    const response = await supertest(app.app)
      .get(`/restaurant/${restaurant.id}/menu`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
  });

  it("should be able to update", async () => {
    const menu = await Menu.findOne({ name: "Burgers" });

    const response = await supertest(app.app)
      .put(`/menu/${menu.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Burgerss" })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Menu Updated");
  });

  it("should be able to add Item", async () => {
    const menu = await Menu.findOne({ name: "Burgerss" });

    const response = await supertest(app.app)
      .post(`/menu/${menu.id}/item`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Cheese Burger",
        price: 5,
        description: "Hamburger with cheese",
        preparation_time: 5,
      })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Item Added");
  });

  it("should be able to update Item", async () => {
    const menu = await Menu.findOne({ name: "Burgerss" });
    const id = menu.items[0]._id;

    const response = await supertest(app.app)
      .put(`/menu/${menu.id}/item/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "XL Cheese Burgerrer",
        price: 30,
        description: "Extra Large Hamburger with cheeseee",
        preparation_time: 30,
      })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Item Updated");
  });

  it("should be able to delete Item", async () => {
    const menu = await Menu.findOne({ name: "Burgerss" });
    const id = menu.items[0]._id;

    const response = await supertest(app.app)
      .delete(`/menu/${menu.id}/item/${id}`)
      .set("Authorization", `Bearer ${token}`)

      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Item Deleted");
  });

  it("should be able to delete", async () => {
    const menu = await Menu.findOne({ name: "Burgerss" });

    const response = await supertest(app.app)
      .delete(`/menu/${menu.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Menu Deleted");
  });
});
