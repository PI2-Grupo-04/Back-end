import { Router } from "express";
import authMiddleware from "../middleware/jwtAuthMiddleware";
import restaurantMiddleware from "../middleware/restaurant.middleware";
import RestaurantController from "../controllers/RestaurantController";

const router = Router();

router.get("/:id", RestaurantController.retrieve);

router.use(authMiddleware);
router.post("/", RestaurantController.create);
router.put("/:id", [restaurantMiddleware], RestaurantController.update);
router.delete("/:id", [restaurantMiddleware], RestaurantController.delete);

export default router;
