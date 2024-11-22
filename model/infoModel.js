import { Sequelize } from "sequelize";
import db from "../config/database.js";
import admin from "./adminModel.js";

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

admin.hasMany(Info);
Info.belongsTo(admin);

export default Info;
