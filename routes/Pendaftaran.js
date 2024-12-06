import express from "express";
import {
  getPendaftaran,
  postPendaftaran,
  getPendaftaranById,
  putPendaftaranById,
  deletePendaftaranById,
} from "../controllers/Pendaftaran.js";
import { verifyToken } from "../middleware/Token.js";

const pendaftaranRouter = express.Router();
pendaftaranRouter.get("/", getPendaftaran);
pendaftaranRouter.get("/:id", getPendaftaranById);
pendaftaranRouter.delete("/:id", deletePendaftaranById);
pendaftaranRouter.put("/:id", putPendaftaranById);
pendaftaranRouter.post("/", verifyToken, postPendaftaran);

export default pendaftaranRouter;
