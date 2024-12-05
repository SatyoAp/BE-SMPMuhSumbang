import Image from "../model/dokumenModel.js";
import uploadToDrive from "../config/driveConfig.js";

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
    const dokumen = await Image.findAll();
    res.json(dokumen);
  } catch (error) {
    console.log(error);
  }
};

export const uploadController = async (req, res) => {
  try {
    const files = req.files;

    if (!files || Object.keys(files).length !== 5) {
      return res.status(400).json({ message: "All 5 images are required" });
    }

    const uploadedUrls = {};

    for (const key of Object.keys(files)) {
      const file = files[key][0];
      const driveFile = await uploadToDrive(file.path, file.originalname);
      uploadedUrls[key] = driveFile.webViewLink;
    }

    const imageRecord = await Image.create(uploadedUrls);
    res
      .status(201)
      .json({ message: "Images uploaded successfully", data: imageRecord });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

// // Konfigurasi Multer
// const storage = multer.memoryStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Filter format file
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /png|jpg|jpeg/; // Format yang diizinkan
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   ); // Ekstensi
//   const mimetype = allowedTypes.test(file.mimetype); // MIME type

//   if (extname && mimetype) {
//     cb(null, true); // Lanjutkan upload
//   } else {
//     cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!")); // Tolak upload
//   }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // Batas ukuran file (5MB)
//     files: 5, // Batas jumlah file
//   },
// });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const uploadFiles = async (req, res) => {
  try {
    const uploadedFiles = {};

    // Loop untuk mengecek dan mengupload gambar 1-5
    for (let i = 1; i <= 5; i++) {
      const fileField = `gambar${i}`;

      // Pastikan file untuk setiap field ada
      if (
        !req.files ||
        !req.files[fileField] ||
        req.files[fileField].length === 0
      ) {
        return res.status(400).json({ error: `${fileField} is required` });
      }

      // Upload file ke Google Drive dan simpan URL-nya
      uploadedFiles[fileField] = await uploadFileToDrive(
        req.files[fileField][0]
      );
    }

    // Simpan informasi file yang diupload ke database (misalnya MySQL dengan Sequelize)
    const savedRecord = await File.create(uploadedFiles);

    // Kirimkan respons sukses dengan data yang sudah disimpan
    res
      .status(201)
      .json({ message: "Files uploaded successfully", data: savedRecord });
  } catch (error) {
    // console.error("Error uploading files:", error);
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "An error occurred while uploading files" });
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// export const uploadImages = async (req, res) => {
//   const { files } = req; // Files dari Multer
//   const { dokumenId } = req.body;

//   if (!dokumenId) {
//     return res.status(400).json({ message: "dokumen ID is required" });
//   }

//   try {
//     const updateData = {};
//     const fileFields = ["gambar1", "gambar2", "gambar3", "gambar4", "gambar5"];

//     for (let i = 0; i < fileFields.length; i++) {
//       const fieldName = fileFields[i];
//       if (files[fieldName]) {
//         const file = files[fieldName][0];
//         const fileUrl = await uploadFile(file.path, file.filename);
//         updateData[fieldName] = fileUrl;
//         fs.unlinkSync(file.path); // Hapus file lokal
//       }
//     }

//     // Update database
//     await Dokumen.update(updateData, { where: { id: dokumenId } });

//     res
//       .status(200)
//       .json({ message: "Images uploaded successfully", data: updateData });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error uploading images", error: error.message });
//   }
// };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const uploadFileToDrive = async (filePath, fileName, mimeType) => {
//   try {
//     const fileMetadata = {
//       name: fileName,
//       parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
//     };

//     const media = {
//       mimeType,
//       body: fs.createReadStream(filePath),
//     };

//     const response = await drive.files.create({
//       requestBody: fileMetadata,
//       media: media,
//       fields: "id, webViewLink",
//     });

//     return response.data.webViewLink; // URL file di Google Drive
//   } catch (error) {
//     throw new Error("Gagal mengunggah ke Google Drive: " + error.message);
//   }
// };

// // Controller untuk upload gambar
// export const uploadImages = async (req, res) => {
//   try {
//     const files = req.files;
//     const uploadedUrls = [];

//     for (const key in files) {
//       const file = files[key][0]; // Hanya mengambil file pertama dari setiap field
//       const filePath = file.path;
//       const fileName = file.originalname;
//       const mimeType = file.mimetype;

//       // Upload ke Google Drive
//       const fileUrl = await uploadFileToDrive(filePath, fileName, mimeType);

//       // Simpan ke database
//       await File.create({ fileName, fileUrl });

//       uploadedUrls.push(fileUrl);

//       // Hapus file lokal
//       fs.unlinkSync(filePath);
//     }

//     res.status(200).json({
//       message: "Gambar berhasil diunggah!",
//       urls: uploadedUrls,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// // Fungsi untuk mengupload file ke Firebase Storage
// export const uploadFileToFirebase = async (filePath, destination) => {
//   try {
//     await bucket.upload(filePath, {
//       destination: destination, // Path di Firebase Storage
//     });
//     console.log(`File uploaded to Firebase Storage: ${destination}`);
//     return `https://storage.googleapis.com/${bucket.name}/${destination}`;
//   } catch (error) {
//     console.error("Error uploading file to Firebase:", error);
//     throw error;
//   }
// };

// // Endpoint untuk mengupload 5 gambar
// export const uploadImages = async (req, res) => {
//   try {
//     // Pastikan file gambar ada di request
//     const images = req.files;

//     // Array untuk menyimpan URL file yang berhasil diupload
//     const uploadedUrls = [];

//     // Loop untuk upload semua gambar
//     for (let i = 0; i < 5; i++) {
//       const fieldName = `gambar${i + 1}`;
//       if (images[fieldName]) {
//         const file = images[fieldName][0];
//         const destination = `uploads/${file.filename}`; // Nama file di Firebase Storage
//         const firebaseUrl = await uploadFileToFirebase(file.path, destination);
//         uploadedUrls.push({ [`gambar${i + 1}`]: firebaseUrl });
//       }
//     }

//     // Response sukses
//     res.status(200).json({
//       message: "Gambar berhasil diupload",
//       data: uploadedUrls,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error uploading images", error: error.message });
//   }
// };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// export const uploadImages = async (req, res) => {
//   try {
//     const fileFields = ["gambar1", "gambar2", "gambar3", "gambar4", "gambar5"];
//     const fileUploads = {};

//     // Loop untuk mengunggah setiap gambar ke Firebase Storage
//     for (const field of fileFields) {
//       const file = req.files[field] ? req.files[field][0] : null;

//       if (file) {
//         const blob = bucket.file(Date.now() + "-" + file.originalname); // Membuat nama unik untuk file
//         const blobStream = blob.createWriteStream({
//           metadata: {
//             contentType: file.mimetype,
//           },
//         });

//         await new Promise((resolve, reject) => {
//           blobStream.on("error", (err) => {
//             console.error(`Error uploading ${field}:`, err);
//             reject(err);
//           });

//           blobStream.on("finish", async () => {
//             // URL publik untuk file yang diunggah
//             const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//             fileUploads[field] = publicUrl; // Simpan URL ke objek hasil
//             resolve();
//           });

//           blobStream.end(file.buffer);
//         });
//       } else {
//         fileUploads[field] = null; // Jika tidak ada file, simpan null
//       }
//     }

//     // Simpan URL gambar ke database
//     const upload = await Dokumen.create(fileUploads);

//     res.status(201).json({
//       message: "Dokumen berhasil diunggah",
//       data: upload,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Eror dalam mengunggah gambar", error });
//   }
// };

// // Fungsi untuk menyimpan data gambar ke database
// export const uploadImages = async (req, res) => {
//   try {
//     const filePaths = {
//       gambar1: req.files.gambar1 ? req.files.gambar1[0].path : null,
//       gambar2: req.files.gambar2 ? req.files.gambar2[0].path : null,
//       gambar3: req.files.gambar3 ? req.files.gambar3[0].path : null,
//       gambar4: req.files.gambar4 ? req.files.gambar4[0].path : null,
//       gambar5: req.files.gambar5 ? req.files.gambar5[0].path : null,
//     };

//     const upload = await Dokumen.create(filePaths);

//     res.status(201).json({
//       message: "Dokumen berhasil di unggah",
//       data: upload,
//     });
//   } catch (error) {
//     console.error(error);
//     console.log(req.files); // Tambahkan ini untuk melihat input file
//     res.status(500).json({ message: "Eror dalam mengunggah gambar", error });
//   }
// };

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
