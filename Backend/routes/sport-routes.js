import express from "express";
import {
    registerSport,
    getAllSports,
    getSingleSport,
    deleteSport,
    updateSport,
} from "../controllers/sport-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getAllSports);
router.get("/:id", authMiddleware, getSingleSport);

// Write — admin and above only
router.post("/", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerSport);
router.put("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updateSport);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deleteSport);

export default router;