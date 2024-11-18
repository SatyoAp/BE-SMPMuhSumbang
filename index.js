import express from "express";
import db from "./config/database.js";
import router from "./routes/Users.js";
import pendaftaranRouter from "./routes/Pendaftaran.js";
import kritikRouter from "./routes/Kritik.js";
import infoRouter from "./routes/Info.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import FileUpload from "express-fileupload";
const server = express();
// import Pendaftaran from "./model/pendaftaranModel.js";
import { startSequelize } from "./utils/startSequelize.js";
dotenv.config();
startSequelize(db);

const port = process.env.MYSQLPORT;

try {
  await db.authenticate();
  console.log("Database terkoneksi");
} catch (error) {
  console.error(error);
}

// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.raw());
// server.use(bodyParser.json());

// server.use(
//   cors({ credentials: true, origin: "https://be-smp-muh-sumbang.vercel.app" })
// );
// server.use(cors({ credentials: true, origin: "http://192.168.1.7:5174" }));
// server.use(cors({ credentials: true, origin: "http://192.168.1.7:5173" }));
// server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const allowedOrigins = ["http://192.168.1.7:5174", "http://192.168.1.7:5173"];

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
server.use(express.json());
server.use(FileUpload());
server.use(express.static("public"));
server.use("/users", router);
server.use("/pendaftaran", pendaftaranRouter);
server.use("/kritik", kritikRouter);
server.use("/info", infoRouter);

server.listen(port, () => {
  console.log(`Server running di port ${port}`);
});
