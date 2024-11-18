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
      return res
        .status(404)
        .json({
          message: `data kritik dengan id : ${req.params.id} tidak ada`,
        });
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
    res.status(200).json({
      message: "Data Berhasil dihapus",
    });
  } catch (e) {
    console.error("Error deleting kritik:", e);
    next(e);
  }
};

export const postKritik = async (req, res) => {
  try {
    const { nama, email, kritik } = req.body;
    if (!nama || !email || !kritik) {
      return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
    }
    const kritik_ = await createKritik(nama, email, kritik);
    res.status(200).json({ msg: "Data Kritik Berhasil di masukkan" });
  } catch (error) {
    res.json({ msg: "Data Kritik Gagal di masukkan" });
  }
};

export const putKritikById = async (req, res) => {
  try {
    const { nama, email, kritik } = req.body;
    if (!nama || !email || !kritik) {
      return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
    }
    await updateKritikById(req.params.id, nama, email, kritik);
    const kritik_ = await findKritikById(req.params.id);
    if (!kritik_) {
      return res.status(404).json({ msg: "Kritik tidak ada" });
    }
    res.status(200).json({ msg: "Data berhasil di update", data: kritik_ });
  } catch (error) {
    console.error("Error updating kritik:", error);
    res
      .status(500)
      .json({ msg: "Data Kritik Gagal di masukkan", error: error.message });
  }
};
