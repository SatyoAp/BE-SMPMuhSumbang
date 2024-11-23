import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadImages,
  getDokumen,
  deleteData,
  getDokumenById,
} from "../controllers/Dokumen.js";

const routerDok = express.Router();
routerDok.get("/", getDokumen);
routerDok.get("/:id", getDokumenById);
routerDok.delete("/delete/:id", deleteData);

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Batas ukuran file (5MB)
    files: 5, // Batas jumlah file
  },
});

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
