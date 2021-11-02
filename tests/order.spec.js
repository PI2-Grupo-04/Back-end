import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/server";

import User from "../src/models/User";
import Restaurant from "../src/models/Restaurant";
import Menu from "../src/models/Menu";
import Order from "../src/models/Order";

let token = "";
let restaurant = null;
let menu = null;

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

  menu = await Menu.create({ name: "Burger" });
  restaurant.menus.push(menu);
  restaurant.save();
  menu.items.push({
    name: "Cheese Burger",
    price: 5,
    description: "hamburger with cheese",
    preparation_time: 5,
  });
  menu.save();

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

describe("OrderController", () => {
  it("should be able to create", async () => {
    const response = await supertest(app.app)
      .post("/order")
      .send({ order: [{ menu: menu._id, items: menu.items[0]._id }] })
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Order Created");
  });

  it("should be able to cancel", async () => {
    const order = await Order.findOne({ status: "Awaiting" });

    const response = await supertest(app.app)
      .delete(`/order/${order._id}`)
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Order Cancelled");
  });

  it("should be able to create", async () => {
    const new_order = await Order.create({ notes: "sem pickles" });
    new_order.restaurant = restaurant.id;
    new_order.save();

    const response = await supertest(app.app)
      .put(`/restaurant/${restaurant.id}/order/${new_order.id}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Order Confirmed");
  });

  it("should be able to reject", async () => {
    const new_order = await Order.create({ notes: "com pickles" });
    new_order.restaurant = restaurant.id;
    new_order.save();

    const response = await supertest(app.app)
      .put(`/restaurant/${restaurant.id}/order/${new_order.id}/reject`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Order Rejected");
  });
});
