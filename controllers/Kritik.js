import Kritik from "../model/kritikModel.js";
import {
  createKritik,
  findKritikById,
  removeKritikById,
  updateKritikById,
} from "../services/ServKritik.js";

export const getKritik = async (req, res) => {
  try {
    const kritik = await Kritik.findAll();
    res.json(kritik);
  } catch (error) {
    console.log(error);
  }
};

export const getKritikById = async (req, res) => {
  try {
    const kritik = await findKritikById(req.params.id);
    if (!kritik) {
      return res.status(404).json({ message: "kritik not found" });
    }
    res.json(kritik);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteKritikById = async (req, res, next) => {
  try {
    await removeKritikById(req.params.id);
    res.json({
      message: httpStatusMessages[res.statusCode],
    });
  } catch (e) {
    next(e);
    res.json({ msg: "Data Berhasil di Hapus" });
  }
};

export const postKritik = async (req, res) => {
  try {
    const { nama, email, kritik } = req.body;
    const kritik_ = await createKritik(nama, email, kritik);
    res.json(kritik_);
  } catch (error) {
    res.json({ msg: "Data Kritik Berhasil di masukkan" });
  }
};

export const putKritikById = async (req, res) => {
  const { nama, email, kritik } = req.body;
  await updateKritikById(req.params.id, nama, email, kritik);
  const kritik_ = await findKritikById(req.params.id);
  res.json(kritik_);
};
