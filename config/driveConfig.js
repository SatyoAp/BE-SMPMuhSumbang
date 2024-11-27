import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Cek apakah variabel lingkungan terdefinisi
if (!process.env.GOOGLE_CREDENTIALS) {
  throw new Error(
    "GOOGLE_CREDENTIALS is not defined in the environment variables"
  );
}

// Cek nilai kredensial
console.log(process.env.GOOGLE_CREDENTIALS);

// Parse kredensial dari variabel lingkungan
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Inisialisasi autentikasi Google
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

/**
 * Upload file ke Google Drive
 * @param {string} filePath - Path file lokal
 * @param {string} fileName - Nama file untuk disimpan di Drive
 * @returns {string} URL file di Google Drive
 */
export const uploadFile = async (filePath, fileName) => {
  const fileMetadata = { name: fileName };
  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  const fileId = response.data.id;

  // Buat file dapat diakses dengan URL
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return `https://drive.google.com/uc?id=${fileId}`;
};
