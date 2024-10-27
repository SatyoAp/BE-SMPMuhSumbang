import { Sequelize } from "sequelize";
import db from "../config/database.js";
import nilai from "./nilaiModel.js";

const { DataTypes } = Sequelize;

const Pendaftaran = db.define(
  "pendaftaran",
  {
    id_daftar: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    id_nilai: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Pendaftaran.associate = ({ nilai }) => {
  nilai.belongsToMany(nilai, {
    foreignKey: "id_nilai",
    as: "nilai",
    through: Pendaftaran,
    otherKey: "id_daftar",
  });
};

return Pendaftaran;

export default Pendaftaran;
