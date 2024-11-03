import express from "express";
import {
  getKritik,
  postKritik,
  getKritikById,
  putKritikById,
  deleteKritikById,
} from "../controllers/Kritik.js";

const kritikRouter = express.Router();
kritikRouter.get("/", getKritik);
kritikRouter.get("/:id", getKritikById);
kritikRouter.delete("/:id", deleteKritikById);
kritikRouter.put("/:id", putKritikById);
kritikRouter.post("/", postKritik);

export default kritikRouter;
