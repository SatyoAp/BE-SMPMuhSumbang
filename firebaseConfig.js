import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Masukkan bucket dari Firebase Console
});

const bucket = admin.storage().bucket();
export default bucket;
