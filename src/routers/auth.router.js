import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/jwtAuthMiddleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/user", [authMiddleware], AuthController.authUser);

export default router;
