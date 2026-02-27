import express from "express";
import {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/member-controllers.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

// Read — all authenticated roles
router.get("/", authMiddleware, getAllMembers);
router.get("/:id", authMiddleware, getMemberById);

// Write — admin and above only
router.post("/", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), registerMember);
router.put("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), updateMember);
router.delete("/:id", authMiddleware, AuthorizeRole("SUPER_ADMIN", "ADMIN"), deleteMember);

export default router;
