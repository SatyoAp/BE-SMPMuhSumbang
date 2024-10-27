import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Pendaftaran = db.define(
  "pendaftaran",
  {
    nama: {
      type: DataTypes.STRING,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
    },
    nama_ortu: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    no_hp: {
      type: DataTypes.STRING,
    },
    nik: {
      type: DataTypes.STRING,
    },
    asal_sekolah: {
      type: DataTypes.TEXT,
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
    total: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Pendaftaran;
