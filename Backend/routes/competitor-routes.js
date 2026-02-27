import express from "express";
import {
    registerCompetitor,
    getAllCompetitors,
    getCompetitorById,
    deleteCompetitor,
    updatedCompetitor,
} from "../controllers/competitor-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getAllCompetitors);
router.get("/:id", authMiddleware, getCompetitorById);

// Write — admin and above only
router.post("/", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerCompetitor);
router.put("/update/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updatedCompetitor);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deleteCompetitor);

export default router;
