import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  uploadController,
  getDokumen,
  deleteData,
  getDokumenById,
} from "../controllers/Dokumen.js";
import { fileURLToPath } from "url";

// // Mendefinisikan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routerDok = express.Router();
routerDok.get("/", getDokumen);
routerDok.get("/:id", getDokumenById);
routerDok.delete("/delete/:id", deleteData);

// Endpoint untuk mengunggah gambar
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (![".jpg", ".jpeg", ".png"].includes(ext)) {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const uploadFields = upload.fields([
//   { name: "gambar1", maxCount: 1 },
//   { name: "gambar2", maxCount: 1 },
//   { name: "gambar3", maxCount: 1 },
//   { name: "gambar4", maxCount: 1 },
//   { name: "gambar5", maxCount: 1 },
// ]);

// routerDok.post("/upload", uploadFields, uploadFiles);

// // routerDok.post(
// //   "/upload",
// //   async (req, res, next) => {
// //     try {
// //       upload.fields([
// //         { name: "gambar1", maxCount: 1 },
// //         { name: "gambar2", maxCount: 1 },
// //         { name: "gambar3", maxCount: 1 },
// //         { name: "gambar4", maxCount: 1 },
// //         { name: "gambar5", maxCount: 1 },
// //       ])(req, res, next);
// //     } catch (err) {
// //       console.error(err);
// //       res
// //         .status(500)
// //         .json({ message: "Kesalahan saat mengunggah file", error: err });
// //     }
// //   },
// //   uploadImages
// // );

// export default routerDok;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Buat folder jika belum ada
    }
    cb(null, uploadDir); // Tentukan folder penyimpanan
  },
  // destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only .png, .jpg, and .jpeg are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).fields([
  { name: "gambar1", maxCount: 1 },
  { name: "gambar2", maxCount: 1 },
  { name: "gambar3", maxCount: 1 },
  { name: "gambar4", maxCount: 1 },
  { name: "gambar5", maxCount: 1 },
]);

routerDok.post("/upload", upload, uploadController);

export default routerDok;
