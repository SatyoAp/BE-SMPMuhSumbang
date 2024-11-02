import express from "express";
import db from "./config/database.js";
import router from "./routes/Users.js";
import pendaftaranRouter from "./routes/Pendaftaran.js";
import nilaiRouter from "./routes/Nilai.js";
import guruRouter from "./routes/Guru.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
// import Pendaftaran from "./model/pendaftaranModel.js";
import { startSequelize } from "./utils/startSequelize.js";
dotenv.config();
const server = express();
startSequelize(db);

const port = process.env.MYSQLPORT;

try {
  await db.authenticate();
  console.log("Database terkoneksi");
  //   await Users.sync();
} catch (error) {
  console.error(error);
}

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.raw());
server.use(bodyParser.json());

server.use(cors());
// server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(cookieParser());
server.use(express.json());
// server.use(router);
// server.use(pendaftaranRouter);
server.use("/users", router);
server.use("/pendaftaran", pendaftaranRouter);
server.use("/nilai", nilaiRouter);
server.use("/guru", guruRouter);

server.listen(port, () => {
  console.log(`Server running di port ${port}`);
});
