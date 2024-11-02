import express from "express";
import {
  getGuru,
  postGuru,
  getGuruById,
  putGuruById,
  deleteGuruById,
} from "../controllers/Guru.js";

const guruRouter = express.Router();
guruRouter.get("/", getGuru);
guruRouter.get("/:id", getGuruById);
guruRouter.delete("/:id", deleteGuruById);
guruRouter.put("/:id", putGuruById);
guruRouter.post("/", postGuru);

export default guruRouter;
