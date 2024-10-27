import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Nilai = db.define(
  "nilai",
  {
    id_nilai: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nilai_IPA: {
      type: DataTypes.INTEGER,
    },
    nilai_Matematika: {
      type: DataTypes.INTEGER,
    },
    nilai_Bhs_Indonesia: {
      type: DataTypes.INTEGER,
    },
    rata_rata_nilai: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Nilai;
