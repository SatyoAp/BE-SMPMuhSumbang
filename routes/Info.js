import express from "express";
import {
  getInfo,
  postInfo,
  getInfoById,
  putInfoById,
  deleteInfoById,
} from "../controllers/Info.js";

const infoRouter = express.Router();
infoRouter.get("/", getInfo);
infoRouter.get("/:id", getInfoById);
infoRouter.delete("/:id", deleteInfoById);
infoRouter.put("/:id", putInfoById);
infoRouter.post("/", postInfo);

export default infoRouter;
