import Info from "../model/infoModel.js";

export const findInfoById = async (id) => {
  return await Info.findOne({
    where: { id },
  });
};

export const removeInfoById = async (id) => {
  try {
    const result = await Info.destroy({
      where: { id },
    });

    if (result === 0) {
      throw new Error("Tidak ada data yang akan di hapus");
    }

    return { success: true, message: "Data berhasil di hapus" };
  } catch (error) {
    console.error("Error menghapus data Info:", error);
    throw new Error("Gagal menghapus data: " + error.message);
  }
};

export const updateInfoById = async (
  id,
  tanggal_buka,
  tanggal_tutup,
  status,
  detail
) => {
  try {
    const result = await Info.update(
      {
        tanggal_buka,
        tanggal_tutup,
        status,
        detail,
      },
      {
        where: { id },
      }
    );

    if (result[0] === 0) {
      throw new Error("Tidak ada data yang di update");
    }

    return result;
  } catch (error) {
    console.error("Error update info:", error);
    throw error;
  }
};

export const createInfo = async (
  tanggal_buka,
  tanggal_tutup,
  status,
  detail
) => {
  // Input validation
  if (!tanggal_buka || !tanggal_tutup || !status || !detail) {
    throw new Error("Semua kolom harus terisi");
  }

  try {
    const newInfo = await Info.create({
      tanggal_buka,
      tanggal_tutup,
      status,
      detail,
    });
    return newInfo;
  } catch (error) {
    console.error("Error input info:", error);
    throw new Error("Gagal input info: " + error.message);
  }
};
