import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

// const db = new Sequelize("smp_muhammadiyah_sumbang", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   dialectModule: mysql2,
// });
const db = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    dialect: "mysql",
    dialectModule: mysql2,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
  }
);

export default db;
