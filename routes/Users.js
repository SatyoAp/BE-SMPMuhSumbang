import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/Token.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
router.get("/:id?", getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
