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
      allowNull: false,
    },
    tanggal_tutup: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

admin.hasMany(Info, { foreignKey: "adminId" });
Info.belongsTo(admin, { foreignKey: "adminId" });

export default Info;
