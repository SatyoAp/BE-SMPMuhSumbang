import { google } from "googleapis";
import readline from "readline";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  "https://be-smp-muh-sumbang.vercel.app"
);

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getAccessToken = async () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);

  rl.question("Enter the code from that page here: ", (code) => {
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      console.log("Your refresh token:", token.refresh_token);
      rl.close();
    });
  });
};
