// finance routes
import express from "express";
import {
    registerFinance,
    deleteFinance,
    getFinance,
    getFinances,
    updateFinance,
} from "../controllers/finance-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getFinances);
router.get("/:id", authMiddleware, getFinance);

// Write — admin and above only
router.post("/reg", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerFinance);
router.put("/update/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updateFinance);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deleteFinance);

export default router;