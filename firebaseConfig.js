import admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();

const fireconfig = async (req, res) => {
  try {
    const serviceAccountKey = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    );

    // Inisialisasi Firebase
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    const bucket = await admin.storage().bucket();
    console.log("Firebase Storage bucket initialized:", bucket.name);
  } catch (error) {
    console.error("Error parsing service account JSON:", error.message);
  }
};
export default fireconfig;
