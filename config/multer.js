import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tentukan direktori tempat menyimpan file sementara
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Buat nama file unik berdasarkan timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5MB
  fileFilter: (req, file, cb) => {
    // Hanya izinkan file gambar
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Hanya file gambar dengan format JPEG, JPG, atau PNG yang diperbolehkan!"));
    }
  },
});
