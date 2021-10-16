import { Router } from "express";

import authMiddleware from "../middleware/jwt.middleware";
import restaurantMiddleware from "../middleware/restaurant.middleware";
import orderMiddleware from "../middleware/order.middleware";

import RestaurantController from "../controllers/RestaurantController";
import MenuController from "../controllers/MenuController";
import OrderController from "../controllers/OrderController";

const router = Router();

router.get("/:id", RestaurantController.retrieve);

router.get("/:id/menu/", MenuController.list);

router.use(authMiddleware);
router.post("/", RestaurantController.create);
router.put("/:id", [restaurantMiddleware], RestaurantController.update);
router.delete("/:id", [restaurantMiddleware], RestaurantController.delete);
router.get("/:id/orders/", RestaurantController.orders);
router.put(
  "/:id/order/:order_id/confirm",
  [orderMiddleware],
  OrderController.confirm
);
router.put(
  "/:id/order/:order_id/reject",
  [orderMiddleware],
  OrderController.reject
);

router.post("/:id/menu/", [restaurantMiddleware], MenuController.create);

export default router;
