import express from "express";
import db from "./config/database.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";

// Import route
import router from "./routes/Users.js";
import routerAd from "./routes/Admin.js";
import pendaftaranRouter from "./routes/Pendaftaran.js";
import kritikRouter from "./routes/Kritik.js";
import infoRouter from "./routes/Info.js";
import routerDok from "./routes/Dokumen.js";

import { fileURLToPath } from "url";
import { startSequelize } from "./utils/startSequelize.js";
dotenv.config();
startSequelize(db);

const server = express();
const upload = multer();
// Mendefinisikan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.MYSQLPORT;

try {
  await db.authenticate();
  console.log("Database terkoneksi");
} catch (error) {
  console.error(error);
}

// server.use(
//   // cors({ credentials: true, origin: "https://be-smp-muh-sumbang.vercel.app" })
// );
// server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const allowedOrigins = ["http://192.168.1.6:5173", "http://192.168.1.6:5174" ];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // Cek apakah origin ada dalam daftar yang diizinkan
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Izinkan origin
    } else {
      callback(new Error("Not allowed by CORS")); // Tolak origin
    }
  },
};
server.use(cors(corsOptions));
server.use(cookieParser());

// server.use(FileUpload());
// server.use(express.static("uploads"));
// server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use((err, req, res, next) => {
  console.error("Error middleware:", err.message);
  res.status(500).json({ msg: "Internal server error", error: err.message });
});

server.use(bodyParser.json());
server.use(upload.none());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/users", router);
server.use("/pendaftaran", pendaftaranRouter);
server.use("/kritik", kritikRouter);
server.use("/info", infoRouter);
server.use("/admin", routerAd);
server.use("/dokumen", routerDok);

// server.use((err, req, res, next) => {
//   if (err.code === "LIMIT_FILE_SIZE") {
//     return res.status(400).json({ message: "File size is too large" });
//   }
//   if (err.code === "LIMIT_UNEXPECTED_FILE") {
//     return res.status(400).json({ message: "Too many files to upload" });
//   }
//   return res.status(500).json({ message: err.message });
// });

server.listen(port, () => {
  console.log(`Server running di port ${port}`);
});
