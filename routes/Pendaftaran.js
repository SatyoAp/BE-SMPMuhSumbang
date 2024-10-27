import express from "express";
import { getPendaftaran, postPendaftaran } from "../controllers/Pendaftaran.js";

const pendaftaranRouter = express.Router();
pendaftaranRouter.get("/", getPendaftaran);
pendaftaranRouter.post("/", postPendaftaran);

export default pendaftaranRouter;
