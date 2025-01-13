import Dokumen from "../model/dokumenModel.js";
import {uploadToGoogleDrive, saveFileToDatabase} from "../config/driveConfig.js";

import path from "path";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// import { fileURLToPath } from "url";
// import { findDokumenById } from "../services/ServDokumen.js";

// // Mendefinisikan __filename dan __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Mendefinisikan untuk mengambil seluruh data
export const getDokumen = async (req, res) => {
  try {
    const dokumen = await Dokumen.findAll();
    res.json(dokumen);
  } catch (error) {
    console.log(error);
  }
}

export const uploadFileController = async (req, res) => {
  try {
    const files = req.files; // File yang diunggah dari Multer
    // const { id } = req.body; // ID dokumen yang akan diperbarui

    // if (!id) {
    //   return res.status(400).json({ msg: "ID dokumen harus disertakan" });
    // }

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ msg: "Tidak ada file yang diunggah" });
    }
    const newRecord = { gambar1: null, gambar2: null, gambar3: null, gambar4: null, gambar5: null }; // Struktur data baru
    const urls = {}; // Untuk menyimpan URL file yang berhasil diunggah

    for (const [columnName, fileArray] of Object.entries(files)) {
      const file = fileArray[0]; // Ambil file pertama di array
      console.log(`Mengunggah file: ${file.filename}`);

      try {
        // Unggah ke Google Drive
        const fileUrl = await uploadToGoogleDrive(file.path, file.filename);

        // Simpan URL ke kolom yang sesuai
        if (newRecord.hasOwnProperty(columnName)) {
          newRecord[columnName] = fileUrl;
        }
        // Tambahkan URL ke respons
        urls[columnName] = fileUrl;

        // Hapus file lokal setelah diunggah
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting local file:", err.message);
          }
        });
      } catch (error) {
        console.error(`Error handling file ${file.filename}:`, error.message);
      }
    }
     // Simpan data baru ke database
     const createdRecord = await Dokumen.create(newRecord);

    res.status(200).json({
      msg: "File berhasil diunggah",
      data : createdRecord,
      urls,
    });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({
      msg: "Terjadi kesalahan saat mengunggah file",
      error: error.message,
    });
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
