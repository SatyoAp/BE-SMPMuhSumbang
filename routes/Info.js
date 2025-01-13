import express from "express";
import {
  getInfo,
  postInfo,
  getInfoById,
  putInfoById,
  deleteInfoById,
} from "../controllers/Info.js";
import { AdminToken } from "../middleware/Token.js";

const infoRouter = express.Router();
infoRouter.get("/", getInfo);
infoRouter.get("/:id", getInfoById);
infoRouter.delete("/:id", AdminToken, deleteInfoById);
infoRouter.put("/:id", AdminToken, putInfoById);
infoRouter.post("/", AdminToken, postInfo);

export default infoRouter;
