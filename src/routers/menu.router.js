import { Router } from "express";
import authMiddleware from "../middleware/jwt.middleware";
import menuMiddleware from "../middleware/menu.middleware";
import MenuController from "../controllers/MenuController";

const router = Router();

router.get("/:id", MenuController.retrieve);

router.use(authMiddleware);
router.put("/:id", [menuMiddleware], MenuController.update);
router.delete("/:id", [menuMiddleware], MenuController.delete);

export default router;
