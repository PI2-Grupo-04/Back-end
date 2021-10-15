import { Router } from "express";
import OrderController from "../controllers/OrderController";

const router = Router();

router.post("/", OrderController.create);
router.delete("/:id", OrderController.cancel);

export default router;
