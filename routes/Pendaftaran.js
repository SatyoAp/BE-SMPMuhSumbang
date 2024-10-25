import express from "express";
import { getPendaftaran, postPendaftaran } from "../controllers/Pendaftaran.js";

const pendaftaranRouter = express.Router();
pendaftaranRouter.get("/pendaftaran", getPendaftaran);
pendaftaranRouter.post("/pendaftaran", postPendaftaran);

export default pendaftaranRouter;
