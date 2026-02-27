import express from "express";
import {
  getAllActivities,
  registerActivity,
  getActivityById,
  deleteActivity,
  updateActivity,
} from "../controllers/activity-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getAllActivities);
router.get("/:id", authMiddleware, getActivityById);

// Write — admin and above only
router.post("/", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerActivity);
router.put("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updateActivity);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deleteActivity);

export default router;
