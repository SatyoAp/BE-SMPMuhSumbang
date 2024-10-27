import express from "express";
import {
  getNilai,
  postNilai,
  getNilaiById,
  putNilaiById,
  deleteNilaiById,
} from "../controllers/nilai.js";

const nilaiRouter = express.Router();
nilaiRouter.get("/", getNilai);
nilaiRouter.get("/:id", getNilaiById);
nilaiRouter.delete("/:id", deleteNilaiById);
nilaiRouter.put("/:id", putNilaiById);
nilaiRouter.post("/", postNilai);

export default nilaiRouter;
