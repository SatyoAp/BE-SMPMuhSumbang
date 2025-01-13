import express from "express";
import {
  getAdmin,
  Register,
  Login,
  Logout,
  getAdminById,
} from "../controllers/Admin.js";
import { AdminToken } from "../middleware/Token.js";
import { refreshToken } from "../controllers/RefreshTokenAdmin.js";

const routerAd = express.Router();
routerAd.get("/", AdminToken, getAdmin);
// router.get("/:id", getAdminById);
routerAd.post("/register", Register);
routerAd.post("/login", Login);
routerAd.get("/token", refreshToken);
routerAd.delete("/logout", Logout);

export default routerAd;
