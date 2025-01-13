import { Sequelize } from "sequelize";
import db from "../config/database.js";
import users from "./usersModel.js";
import admin from "./adminModel.js";

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
      allowNull: false, 
    },
    tempat_lahir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nama_ortu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asal_sekolah: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nilai_IPA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_Matematika: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_Bhs_Indonesia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai_rata_rata: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // new
    userId: {
      type: DataTypes.INTEGER,
    },
    // image: {
    //   type: DataTypes.STRING,
    // },
    // url: {
    //   type: DataTypes.STRING,
    // },
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

users.hasOne(Pendaftaran, { foreignKey: "userId" });
Pendaftaran.belongsTo(users, { foreignKey: "userId" });
admin.hasMany(Pendaftaran, { foreignKey: "adminId" });
Pendaftaran.belongsTo(admin, { foreignKey: "adminId" });

export default Pendaftaran;
