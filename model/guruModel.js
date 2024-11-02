import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Guru = db.define(
  "guru",
  {
    id_guru: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    jabatan: {
      type: DataTypes.STRING,
    },
    no_hp: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    mapel: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Guru;
