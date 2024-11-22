import { Sequelize } from "sequelize";
import db from "../config/database.js";
import pendaftaran from "./pendaftaranModel.js";

const { DataTypes } = Sequelize;

const Dokumen = db.define(
  "dokumen",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gambar1: {
      type: DataTypes.STRING,
    },
    gambar2: {
      type: DataTypes.STRING,
    },
    gambar3: {
      type: DataTypes.STRING,
    },
    gambar4: {
      type: DataTypes.STRING,
    },
    gambar5: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

pendaftaran.hasOne(Dokumen);
Dokumen.belongsTo(pendaftaran);

export default Dokumen;
