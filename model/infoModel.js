import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Info = db.define(
  "info_pendaftaran",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal_buka: {
      type: DataTypes.DATE,
    },
    tanggal_tutup: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    detail: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Info;
