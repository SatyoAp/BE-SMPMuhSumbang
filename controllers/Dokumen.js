import Dokumen from "../model/dokumenModel.js";
import multer from "multer";
import path from "path";
import { createDokumen } from "../services/ServDokumen.js";

export const getDokumen = async (req, res) => {
  try {
    const dokumen = await Dokumen.findAll();
    res.json(dokumen);
  } catch (error) {
    console.log(error);
  }
};

// export const getInfoById = async (req, res) => {
//   try {
//     const info = await findInfoById(req.params.id);
//     if (!info) {
//       return res.status(404).json({
//         message: `data info dengan id : ${req.params.id} tidak ada`,
//       });
//     }
//     res.json(info);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const deleteInfoById = async (req, res, next) => {
//   try {
//     await removeInfoById(req.params.id);
//     res.status(200).json({
//       message: "Data Berhasil dihapus",
//     });
//     res.json({ msg: "Data Berhasil di Hapus" });
//   } catch (e) {
//     console.error("Error deleting kritik:", e);
//     next(e);
//   }
// };

// export const postDokumen = async (req, res) => {
//   try {
//     const { image1, image2, image3, image4, image5 } = req.body;
//     if (!image1 || !image2 || !image3 || !image4 || !image5) {
//       return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
//     }
//     const dokumen = await createDokumen(image1, image2, image3, image4, image5);
//     res.status(200).json({ msg: "Data Dokumen Berhasil di masukkan" });
//   } catch (error) {
//     res.json({ msg: "Data dokumen Gagal di masukkan" });
//   }
// };

// Middleware untuk mengupload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/"); // Folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan nama unik
  },
});

// Fungsi untuk memfilter file
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Ekstensi yang diizinkan
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // File valid
  } else {
    cb(
      new Error(
        "Hanya file dengan ekstensi .png, .jpg, dan .jpeg yang diizinkan!"
      ),
      false
    ); // File tidak valid
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "gambar1" },
  { name: "gambar2" },
  { name: "gambar3" },
  { name: "gambar4" },
  { name: "gambar5" },
]);

export const uploadDokumen = async (req, res) => {
  // Cek jika ada error dari multer
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "Tidak ada file yang diupload." });
  }
  try {
    const dokumen = await createDokumen.createDokumen({
      gambar1: req.files["gambar1"] ? req.files["gambar1"][0].path : null,
      gambar2: req.files["gambar2"] ? req.files["gambar2"][0].path : null,
      gambar3: req.files["gambar3"] ? req.files["gambar3"][0].path : null,
      gambar4: req.files["gambar4"] ? req.files["gambar4"][0].path : null,
      gambar5: req.files["gambar5"] ? req.files["gambar5"][0].path : null,
    });
    res.status(201).json(dokumen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "HAHAHA Eror" });
  }
};

// export const putInfoById = async (req, res) => {
//   try {
//     const { tanggal_buka, tanggal_tutup, status, detail } = req.body;
//     if (!tanggal_buka || !tanggal_tutup || !status || !detail) {
//       return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
//     }
//     await updateInfoById(
//       req.params.id,
//       tanggal_buka,
//       tanggal_tutup,
//       status,
//       detail
//     );
//     const respon = await findInfoById(req.params.id);
//     if (!respon) {
//       return res.status(404).json({ msg: "data info tidak ada" });
//     }
//     res.status(200).json({ msg: "Data berhasil di update", data: respon });
//   } catch (error) {
//     console.error("Error updating data info:", error);
//     res
//       .status(500)
//       .json({ msg: "Data info Gagal di masukkan", error: error.message });
//   }
// };
