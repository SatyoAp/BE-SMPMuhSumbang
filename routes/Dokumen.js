import express from "express";
import { upload, uploadDokumen, getDokumen } from "../controllers/Dokumen.js";

const routerDok = express.Router();
routerDok.get("/", getDokumen);
// routerDok.post("/upload", upload, uploadDokumen);

routerDok.post("/upload", (req, res) => {
  upload,
    uploadDokumen(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Multer-specific error
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Unknown error
        return res.status(400).json({ error: err.message });
      }
      // Success
      res.status(200).send("Files uploaded!");
    });
});

export default routerDok;
