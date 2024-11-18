import Guru from "../model/guruModel.js";
import {
  createGuru,
  findGuruById,
  removeGuruById,
  updateGuruById,
} from "../services/ServGuru.js";

export const getGuru = async (req, res) => {
  try {
    const guru = await Guru.findAll();
    res.json(guru);
  } catch (error) {
    console.log(error);
  }
};

export const getGuruById = async (req, res) => {
  try {
    const guru = await findGuruById(req.params.id);
    if (!guru) {
      return res.status(404).json({
        message: `data guru dengan id : ${req.params.id} tidak ada`,
      });
    }
    res.json(guru);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGuruById = async (req, res, next) => {
  try {
    await removeGuruById(req.params.id);
    res.status(200).json({
      message: "Data Berhasil dihapus",
    });
    res.json({ msg: "Data Berhasil di Hapus" });
  } catch (e) {
    console.error("Error deleting kritik:", e);
    next(e);
  }
};

export const postGuru = async (req, res) => {
  try {
    const { nama, jabatan, no_hp, email, mapel } = req.body;
    if (!nama || !jabatan || !no_hp || !email || !mapel) {
      return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
    }
    const guru = await createGuru(nama, jabatan, no_hp, email, mapel);
    res.status(200).json({ msg: "Data guru Berhasil di masukkan" });
  } catch (error) {
    res.json({ msg: "Data guru Gagal di masukkan" });
  }
};

export const putGuruById = async (req, res) => {
  try {
    const { nama, jabatan, no_hp, email, mapel } = req.body;
    if (!nama || !jabatan || !no_hp || !email || !mapel) {
      return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
    }
    await updateGuruById(req.params.id, nama, jabatan, no_hp, email, mapel);
    const respon = await findGuruById(req.params.id);
    if (!respon) {
      return res.status(404).json({ msg: "data guru tidak ada" });
    }
    res.status(200).json({ msg: "Data berhasil di update", data: respon });
  } catch (error) {
    console.error("Error updating data guru:", error);
    res
      .status(500)
      .json({ msg: "Data guru Gagal di masukkan", error: error.message });
  }
};
