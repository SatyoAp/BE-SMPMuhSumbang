import { google } from "googleapis";
import fs from "fs";
import path from "path";
import Dokumen from "../model/dokumenModel.js";
// import { fileURLToPath } from "url";
// // Mendefinisikan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_BASE64;
const credentialsJSON = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

const drive = google.drive({
  version: "v3",
  auth: new google.auth.GoogleAuth({
    keyFile: credentialsJSON, // Ganti dengan path ke file kredensial Google API Anda
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  }),
});

export const uploadToGoogleDrive = async (filePath, fileName) => {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID; //
    const fileMetadata = { name: fileName , parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],};
    const media = {
      mimeType: "image/jpeg", // Ganti sesuai jenis file
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;

    // Buat file bisa diakses publik
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Dapatkan URL publik
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error.message);
    throw error;
  }
};

export const saveFileToDatabase = async (id, columnName, url) => {
  try {
    await Dokumen.update(
      { [columnName]: url }, // Kolom gambar1, gambar2, dll
      { where: { id: id } } // Ganti dengan ID Dokumen
    );
    console.log(`URL berhasil disimpan ke kolom ${columnName} untuk ID: ${id}`);
  } catch (error) {
    console.error("Error saving file URL to database:", error.message);
    throw error;
  }
};

