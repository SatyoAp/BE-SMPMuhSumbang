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
  if (!req.admin) {
    return res.status(401).json({ msg: "Admin tidak terautentikasi" });
  }
  console.log("Admim ID from Token:", req.admin.id);
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
  if (!req.admin) {
    return res.status(401).json({ msg: "Admin tidak terautentikasi" });
  }
  console.log("Admim ID from Token:", req.admin.id);

  const adminId = req.admin.id;
  const { tanggal_buka, tanggal_tutup, status, detail } = req.body;
  if (!tanggal_buka || !tanggal_tutup || !status || !detail) {
    return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
  }
  try {
    const info = await Info.create({tanggal_buka, tanggal_tutup, status, detail, adminId});
    res.status(200).json({ msg: "Data info Berhasil di masukkan" });
    console.log("Request Body:", req.body);
    console.log("Admin ID:", req.admin.id);
  } catch (error) {
    res.json({ msg: "Data info Gagal di masukkan" });
  }
};

export const putInfoById = async (req, res) => {
  // Pastikan admin sudah terautentikasi
  if (!req.admin) {
    return res.status(401).json({ msg: "Admin tidak terautentikasi" });
  }

  console.log("Admin ID from Token:", req.admin.id);
  const adminId = req.admin.id;
  const { tanggal_buka, tanggal_tutup, status, detail } = req.body;

  if (!tanggal_buka || !tanggal_tutup || !status || !detail) {
    return res.status(400).json({ msg: "Semua Kolom Harus Terisi" });
  }
  try {
    const updated = await Info.update(
      {
        tanggal_buka,
        tanggal_tutup,
        status,
        detail,
        adminId, // Admin ID yang diambil dari token
      },
      {
        where: { id: req.params.id }
      },
    );

    // Jika tidak ada data yang diupdate
    if (updated[0] === 0) {
      return res.status(404).json({ msg: "Data pendaftaran tidak ditemukan" });
    }

    // Ambil data setelah diupdate
    const respon = await findInfoById(req.params.id);
    if (!respon) {
      return res.status(404).json({ msg: "Data info tidak ada" });
    }

    // Kirimkan respon dengan data yang sudah diupdate
    res.status(200).json({ msg: "Data berhasil diupdate", data: respon });
  } catch (error) {
    console.error("Error updating data info:", error);
    res.status(500).json({ msg: "Data info gagal diupdate", error: error.message });
  }
};

