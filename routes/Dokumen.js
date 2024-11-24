import express from "express";
// import multer from "multer";
import path from "path";
import {
  upload,
  uploadImages,
  getDokumen,
  deleteData,
  getDokumenById,
} from "../controllers/Dokumen.js";
import { fileURLToPath } from "url";

// Mendefinisikan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routerDok = express.Router();
routerDok.get("/", getDokumen);
routerDok.get("/:id", getDokumenById);
routerDok.delete("/delete/:id", deleteData);

// Endpoint untuk mengunggah file
routerDok.post(
  "/upload",
  async (req, res, next) => {
    try {
      upload.fields([
        { name: "gambar1", maxCount: 1 },
        { name: "gambar2", maxCount: 1 },
        { name: "gambar3", maxCount: 1 },
        { name: "gambar4", maxCount: 1 },
        { name: "gambar5", maxCount: 1 },
      ])(req, res, next);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Kesalahan saat mengunggah file", error: err });
    }
  },
  uploadImages
);

export default routerDok;
