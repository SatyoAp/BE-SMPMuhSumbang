import { Sequelize } from "sequelize";
import db from "../config/database.js";

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

export default Dokumen;
