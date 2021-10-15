import { Router } from "express";
import AuthRouter from "./auth.router";
import RestaurantRouter from "./restaurant.router";
import MenuRouter from "./menu.router";
import OrderRouter from "./order.router";

export const router = Router();

router.use("/auth", AuthRouter);
router.use("/restaurant", RestaurantRouter);
router.use("/menu", MenuRouter);
router.use("/order", OrderRouter);
