import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();

// Parse FIREBASE_SERVICE_ACCOUNT_KEY from .env
console.log(serviceAccount);
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Set bucket name in .env
  });
}

const bucket = admin.storage().bucket();

export default { admin, bucket };
