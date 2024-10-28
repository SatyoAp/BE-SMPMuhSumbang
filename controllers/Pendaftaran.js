import Pendaftaran from "../model/pendaftaranModel.js";
import {
  findPendaftaranById,
  removePendaftaranById,
  updatePendaftaranById,
} from "../services/ServPendaftaran.js";

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
    const daftar = await findPendaftaranById(req.params.id_daftar);
    if (!daftar) {
      return res.status(404).json({ message: "users not found" });
    }
    res.json(daftar);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const postPendaftaran = async (req, res) => {
  const {
    nama,
    tempat_lahir,
    tanggal_lahir,
    nama_ortu,
    alamat,
    no_hp,
    nik,
    asal_sekolah,
  } = req.body;
  try {
    await Pendaftaran.create({
      nama,
      tempat_lahir,
      tanggal_lahir,
      nama_ortu,
      alamat,
      no_hp,
      nik,
      asal_sekolah,
    });
    res.json({ msg: "Input Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const deletePendaftaranById = async (req, res, next) => {
  try {
    await removePendaftaranById(req.params.id_daftar);
    res.json({
      message: httpStatusMessages[res.statusCode],
    });
  } catch (e) {
    next(e);
    res.json({ msg: "Data Berhasil di Hapus" });
  }
};

export const putPendaftaranById = async (req, res) => {
  const {
    nama,
    tempat_lahir,
    tanggal_lahir,
    nama_ortu,
    alamat,
    no_hp,
    nik,
    asal_sekolah,
  } = req.body;
  await updatePendaftaranById(
    req.params.id_daftar,
    nama,
    tempat_lahir,
    tanggal_lahir,
    nama_ortu,
    alamat,
    no_hp,
    nik,
    asal_sekolah
  );
  const daftar = await findNilaiById(req.params.id_daftar);
  res.json(daftar);
};
