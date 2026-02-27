import express from "express";
import {
  getAllPositions,
  getPositionById,
  registerPosition,
  updatePosition,
  deletePosition,
} from "../controllers/position-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getAllPositions);
router.get("/:id", authMiddleware, getPositionById);

// Write — admin and above only
router.post("/", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerPosition);
router.put("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updatePosition);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deletePosition);

export default router;
