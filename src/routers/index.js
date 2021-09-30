import { Router } from "express";
import AuthRouter from "./auth.router";
import RestaurantRouter from "./restaurant.router";
import MenuRouter from "./menu.router";

export const router = Router();

router.use("/auth", AuthRouter);
router.use("/restaurant", RestaurantRouter);
router.use("/menu", MenuRouter);
