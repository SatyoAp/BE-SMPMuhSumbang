import { Sequelize } from "sequelize";
import db from "../config/database.js";
// import nilai from "./nilaiModel.js";

const { DataTypes } = Sequelize;

const Pendaftaran = db.define(
  "pendaftaran",
  {
    id: {
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
    jenis_kelamin: {
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
    nilai_rata_rata: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

// pendaftaran.associate = ({ nilai }) => {
//   nilai.belongsToMany(nilai, {
//     foreignKey: "id_nilai",
//     as: "nilai",
//     through: pendaftaran,
//     otherKey: "id_daftar",
//   });
// };

// return pendaftaran;

// nilai.hasOne(Pendaftaran);
// Pendaftaran.belongsTo(nilai);

export default Pendaftaran;
