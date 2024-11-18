import Info from "../model/infoModel.js";
import {
  createInfo,
  findInfoById,
  removeInfoById,
  updateInfoById,
} from "../services/ServInfo.js";

export const getInfo = async (req, res) => {
  try {
    const info = await Info.findAll();
    res.json(info);
  } catch (error) {
    console.log(error);
  }
};

export const getInfoById = async (req, res) => {
  try {
    const info = await findInfoById(req.params.id);
    if (!info) {
      return res.status(404).json({
        message: `data info dengan id : ${req.params.id} tidak ada`,
      });
    }
    res.json(info);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteInfoById = async (req, res, next) => {
  try {
    await removeInfoById(req.params.id);
    res.status(200).json({
      message: "Data Berhasil dihapus",
    });
    res.json({ msg: "Data Berhasil di Hapus" });
  } catch (e) {
    console.error("Error deleting kritik:", e);
    next(e);
  }
};

export const postInfo = async (req, res) => {
  try {
    const { tanggal_buka, tanggal_tutup, status, detail } = req.body;
    if (!tanggal_buka || !tanggal_tutup || !status || !detail) {
      return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
    }
    const info = await createInfo(tanggal_buka, tanggal_tutup, status, detail);
    res.status(200).json({ msg: "Data info Berhasil di masukkan" });
  } catch (error) {
    res.json({ msg: "Data info Gagal di masukkan" });
  }
};

export const putInfoById = async (req, res) => {
  try {
    const { tanggal_buka, tanggal_tutup, status, detail } = req.body;
    if (!tanggal_buka || !tanggal_tutup || !status || !detail) {
      return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
    }
    await updateInfoById(
      req.params.id,
      tanggal_buka,
      tanggal_tutup,
      status,
      detail
    );
    const respon = await findGuruById(req.params.id);
    if (!respon) {
      return res.status(404).json({ msg: "data info tidak ada" });
    }
    res.status(200).json({ msg: "Data berhasil di update", data: respon });
  } catch (error) {
    console.error("Error updating data info:", error);
    res
      .status(500)
      .json({ msg: "Data info Gagal di masukkan", error: error.message });
  }
};
