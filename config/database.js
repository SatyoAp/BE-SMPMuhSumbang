import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

// const db = new Sequelize("smp_muhammadiyah_sumbang", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });
const db = new Sequelize(
  process.env.MYSQL_ADDON_DB,
  process.env.MYSQL_ADDON_USER,
  process.env.MYSQL_ADDON_PASSWORD,
  {
    dialect: "mysql",
    dialectModule: mysql2,
    host: process.env.MYSQL_ADDON_HOST,
    port: process.env.MYSQL_ADDON_PORT,
  }
);

export default db;
