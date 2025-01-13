import Pendaftaran from "../model/pendaftaranModel.js";
import Users from "../model/usersModel.js"

Users.sync();
Pendaftaran.sync();
import {
  findPendaftaranById,
  removePendaftaranById,
  updatePendaftaranById,
} from "../services/ServPendaftaran.js";
import path from "path";
import fs from "fs";

export const getPendaftaran = async (req, res) => {
  try {
    const pendaftaran = await Pendaftaran.findAll();
    res.json(pendaftaran);
  } catch (error) {
    console.log(error);
  }
};

export const getPendaftaranById = async (req, res) => {
  try {
    const daftar = await findPendaftaranById(req.params.id);
    if (!daftar) {
      return res.status(404).json({ message: "Data tidak ada" });
    }
    res.json(daftar);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const postPendaftaran = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "User tidak terautentikasi" });
  }
  console.log("User ID from Token:", req.user.id);
  const userId = req.user.id;
  const {
    nama,
    tempat_lahir,
    tanggal_lahir,
    nama_ortu,
    alamat,
    no_hp,
    nik,
    jenis_kelamin,
    asal_sekolah,
    nilai_IPA,
    nilai_Matematika,
    nilai_Bhs_Indonesia,
    nilai_rata_rata,
  } = req.body;
  // new

  try {
    const pendaftaran = await Pendaftaran.create({
      nama: nama,
      tempat_lahir: tempat_lahir,
      tanggal_lahir: tanggal_lahir,
      nama_ortu: nama_ortu,
      alamat: alamat,
      no_hp: no_hp,
      nik: nik,
      jenis_kelamin: jenis_kelamin,
      asal_sekolah: asal_sekolah,
      nilai_IPA: nilai_IPA,
      nilai_Matematika: nilai_Matematika,
      nilai_Bhs_Indonesia: nilai_Bhs_Indonesia,
      nilai_rata_rata: nilai_rata_rata,
      userId: userId,
    });
    res.json({ 
      msg: "Pendaftaran Berhasil",
      pendaftaran: {
        status: "200",
        keterangan: "sukses",
        pendaftaranId: pendaftaran.id,
      },
    });
    console.log("Request Body:", req.body);
    console.log("User ID:", req.user.id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deletePendaftaranById = async (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ msg: "User tidak terautentikasi" });
  }
  try {
    const pendaftaran = await Pendaftaran.findOne({
      where: { id: req.params.id }
    });
    if (!pendaftaran) {
      return res.status(404).json({
        message: "Data tidak ditemukan"
      });
    }

    const { nama } = pendaftaran;

    await Pendaftaran.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json({
      message: `Data Berhasil dihapus atas nama ${nama}`
    });
  } catch (e) {
    console.error("Error deleting kritik:", e);
    next(e);
  }
};

export const putPendaftaranById = async (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ msg: "Admin tidak terautentikasi" });
  }
  console.log("Admin ID from Token:", req.admin.id);
  const adminId = req.admin.id;
  const {
    nama,
    tempat_lahir,
    tanggal_lahir,
    nama_ortu,
    alamat,
    no_hp,
    nik,
    jenis_kelamin,
    asal_sekolah,
    nilai_IPA,
    nilai_Matematika,
    nilai_Bhs_Indonesia,
    nilai_rata_rata,
    status,
  } = req.body;

  try {
    // Update data pendaftaran berdasarkan ID yang diberikan
    const updated = await Pendaftaran.update(
      {
        nama,
        tempat_lahir,
        tanggal_lahir,
        nama_ortu,
        alamat,
        no_hp,
        nik,
        jenis_kelamin,
        asal_sekolah,
        nilai_IPA,
        nilai_Matematika,
        nilai_Bhs_Indonesia,
        nilai_rata_rata,
        status,
        adminId, // Menambahkan adminId yang berasal dari token
      },
      {
        where: { id: req.params.id }
      }
    );

    // Cek apakah ada baris yang diubah (update berhasil)
    if (updated[0] === 0) {
      return res.status(404).json({ msg: "Data pendaftaran tidak ditemukan" });
    }

    // Cari data pendaftaran setelah diupdate
    const daftar = await findPendaftaranById(req.params.id);

    res.json({
      msg: "Data pendaftaran berhasil diperbarui",
      data: daftar,
    });
  } catch (e) {
    console.error("Error updating pendaftaran:", e);
    next(e);
  }
};

// export const deletePendaftaranById = async (req, res, next) => {
//   const daftar = await Pendaftaran.findOne({
//     where: {
//       id: req.params.id,
//     },
//   });
//   // if (!daftar) return res.status(404).json({ msg: "data image tidak ada" });
//   try {
//     // const filepath = `./public/images/${daftar.image}`;
//     // fs.unlinkSync(filepath);
//     await Pendaftaran.destroy({
//       where: { id: req.params.id },
//     });
//     res.status(200).json({
//       msg: "Data berhasil di hapus",
//     });
//   } catch (e) {
//     next(e);
//     // console.log(error.message);
//   }
// };