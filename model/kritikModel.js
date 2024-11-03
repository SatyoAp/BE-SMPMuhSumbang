import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kritik = db.define(
  "kriitk",
  {
    nama: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    kritik: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Kritik;
