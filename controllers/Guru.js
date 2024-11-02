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
    const guru = await findGuruById(req.params.id_guru);
    if (!guru) {
      return res.status(404).json({ message: "guru not found" });
    }
    res.json(guru);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGuruById = async (req, res, next) => {
  try {
    await removeGuruById(req.params.id_guru);
    res.json({
      message: httpStatusMessages[res.statusCode],
    });
  } catch (e) {
    next(e);
    res.json({ msg: "Data Berhasil di Hapus" });
  }
};

export const postGuru = async (req, res) => {
  try {
    const { nama, jabatan, no_hp, email, mapel } = req.body;
    const guru = await createGuru(nama, jabatan, no_hp, email, mapel);
    res.json(guru);
  } catch (error) {
    res.json({ msg: "Data Nilai Berhasil di masukkan" });
  }
};

export const putGuruById = async (req, res) => {
  const { nama, jabatan, no_hp, email, mapel } = req.body;
  await updateGuruById(req.params.id_guru, nama, jabatan, no_hp, email, mapel);
  const guru = await findGuruById(req.params.id_guru);
  res.json(guru);
};
