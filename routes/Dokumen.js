import express from "express";
import multer from "multer";
import path from "path";
import {
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

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/tmp"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter format file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /png|jpg|jpeg/; // Format yang diizinkan
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  ); // Ekstensi
  const mimetype = allowedTypes.test(file.mimetype); // MIME type

  if (extname && mimetype) {
    cb(null, true); // Lanjutkan upload
  } else {
    cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!")); // Tolak upload
  }
};

const upload = multer({
  storage,
  fileFilter,
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
