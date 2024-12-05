// import { google } from "googleapis";
// import dotenv from "dotenv";
// import fs from "fs";
// dotenv.config();

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_DRIVE_CLIENT_ID,
//   process.env.GOOGLE_DRIVE_CLIENT_SECRET
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
// });

// const drive = google.drive({
//   version: "v3",
//   auth: oauth2Client,
// });

// export const uploadFileToDrive = async (file) => {
//   const response = await drive.files.create({
//     requestBody: {
//       name: file.originalname,
//       parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
//     },
//     media: {
//       mimeType: file.mimetype,
//       body: fs.createReadStream(filePath),
//     },
//   });

//   // Make file public
//   await drive.permissions.create({
//     fileId: response.data.id,
//     requestBody: {
//       role: "reader",
//       type: "anyone",
//     },
//   });

//   return `https://drive.google.com/uc?id=${response.data.id}`;
// };
// // bismillah

import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

const uploadToDrive = async (filePath, fileName) => {
  const fileMetadata = {
    name: fileName,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id, webViewLink",
  });

  return response.data;
};

export default uploadToDrive;
