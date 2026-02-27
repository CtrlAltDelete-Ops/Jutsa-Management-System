import express from "express";
import {
  deleteCaawiye,
  getCaawiyeSupport,
  getCaawiyeById,
  registerCaawiye,
  updateCaawiye,
} from "../controllers/caawiye-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getCaawiyeSupport);
router.get("/:id", authMiddleware, getCaawiyeById);

// Write — admin and above only
router.post("/", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerCaawiye);
router.put("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updateCaawiye);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deleteCaawiye);

export default router;
