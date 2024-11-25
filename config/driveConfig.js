import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const base64Credentials = process.env.GOOGLE_CREDENTIALS_BASE64;
const credentialsJson = JSON.parse(
  Buffer.from(base64Credentials, "base64").toString("utf8")
);

const auth = new google.auth.GoogleAuth({
  keyFile: credentialsJson,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

export default drive;
