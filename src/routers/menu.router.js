import { Router } from "express";
import authMiddleware from "../middleware/jwt.middleware";
import menuMiddleware from "../middleware/menu.middleware";
import MenuController from "../controllers/MenuController";

const router = Router();

router.get("/:id", MenuController.retrieve);

router.use(authMiddleware);
router.put("/:id", [menuMiddleware], MenuController.update);
router.delete("/:id", [menuMiddleware], MenuController.delete);
router.post("/:id/item", [menuMiddleware], MenuController.addItem);
router.put("/:id/item/:item_id", [menuMiddleware], MenuController.updateItem);
router.delete(
  "/:id/item/:item_id",
  [menuMiddleware],
  MenuController.deleteItem
);

export default router;
