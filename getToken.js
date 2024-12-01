import { google } from "googleapis";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();
// Ganti dengan Client ID, Client Secret, dan Redirect URI Anda
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID, // Client ID dari Google Cloud Console
  process.env.GOOGLE_DRIVE_CLIENT_SECRET, // Client Secret dari Google Cloud Console
  "https://be-smp-muh-sumbang.vercel.app/oauth2callback" // Redirect URI yang Anda tambahkan di Google Cloud Console
);

// Scope menentukan akses yang diminta
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk mendapatkan Refresh Token
const getAccessToken = async () => {
  try {
    // Generate URL otorisasi
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline", // Meminta refresh token untuk akses berkelanjutan
      scope: SCOPES, // Akses Google Drive
      redirect_url: "https://be-smp-muh-sumbang.vercel.app/oauth2callback",
    });

    console.log("Authorize this app by visiting this URL:");
    console.log(authUrl);

    // Tunggu input kode dari pengguna
    rl.question("Enter the code from that page here: ", async (code) => {
      try {
        // Tukarkan kode dengan token
        const { tokens } = await oauth2Client.getToken(code);
        console.log("Your Refresh Token:", tokens.refresh_token);
        rl.close();
      } catch (err) {
        console.error("Error retrieving access token:", err.message);
      }
    });
  } catch (err) {
    console.error("Error generating auth URL:", err.message);
  }
};

getAccessToken();
// bismillah
