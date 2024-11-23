import Dokumen from "../model/dokumenModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { findDokumenById } from "../services/ServDokumen.js";

// Mendefinisikan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mendefinisikan untuk mengambil seluruh data
export const getDokumen = async (req, res) => {
  try {
    const dokumen = await Dokumen.findAll();
    res.json(dokumen);
  } catch (error) {
    console.log(error);
  }
};

// Fungsi untuk menyimpan data gambar ke database
export const uploadImages = async (req, res) => {
  try {
    const filePaths = {
      gambar1: req.files.gambar1 ? req.files.gambar1[0].path : null,
      gambar2: req.files.gambar2 ? req.files.gambar2[0].path : null,
      gambar3: req.files.gambar3 ? req.files.gambar3[0].path : null,
      gambar4: req.files.gambar4 ? req.files.gambar4[0].path : null,
      gambar5: req.files.gambar5 ? req.files.gambar5[0].path : null,
    };

    const upload = await Dokumen.create(filePaths);

    res.status(201).json({
      message: "Dokumen berhasil di unggah",
      data: upload,
    });
  } catch (error) {
    console.error(error);
    console.log(req.files); // Tambahkan ini untuk melihat input file
    res.status(500).json({ message: "Eror dalam mengunggah gambar", error });
  }
};

// Fungsi untuk menghapus file fisik
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error hapus file ${filePath}:`, err);
    } else {
      console.log(`File ${filePath} sukses dihapus.`);
    }
  });
};

// Fungsi untuk menghapus data
export const deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    // Cari data berdasarkan ID
    const upload = await Dokumen.findByPk(id);
    if (!upload) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Hapus file dari folder jika path tersedia
    if (upload.gambar1) deleteFile(path.join(__dirname, "..", upload.gambar1));
    if (upload.gambar2) deleteFile(path.join(__dirname, "..", upload.gambar2));
    if (upload.gambar3) deleteFile(path.join(__dirname, "..", upload.gambar3));
    if (upload.gambar4) deleteFile(path.join(__dirname, "..", upload.gambar4));
    if (upload.gambar5) deleteFile(path.join(__dirname, "..", upload.gambar5));

    // Hapus data dari database
    await upload.destroy();

    res.status(200).json({ message: "Dokumen berhasil di hapus" });
  } catch (error) {
    console.error("Eror menghapus data:", error);
    res.status(500).json({ message: "Eror menghapus data", error });
  }
};

// Mendefinisikan untuk mengambil data berdasarkan id
export const getDokumenById = async (req, res) => {
  try {
    const data = await findDokumenById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: `data dokumen dengan id = ${req.params.id} tidak ada`,
      });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
