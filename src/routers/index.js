import { Router } from "express";
import AuthRouter from "./auth.router";
import RestaurantRouter from "./restaurant.router";

export const router = Router();

router.use("/auth", AuthRouter);
router.use("/restaurant", RestaurantRouter);
