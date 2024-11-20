// services/dokumenService.js
import Dokumen from "../model/dokumenModel.js";

// export const createDokumen = async (data) => {
//   return await Dokumen.create(data);
// };

export const createDokumen = async (
  gambar1,
  gambar2,
  gambar3,
  gambar4,
  gambar5
) => {
  // Input validation
  if (!gambar1 || !gambar2 || !gambar3 || !gambar4 || !gambar5) {
    throw new Error("Semua kolom harus terisi");
  }

  try {
    const newDokumen = await Dokumen.create({
      gambar1,
      gambar2,
      gambar3,
      gambar4,
      gambar5,
    });
    return newDokumen;
  } catch (error) {
    console.error("Error input Dokumen:", error);
    throw new Error("Gagal input Dokumen: " + error.message);
  }
};

export const findDokumenById = async (id) => {
  return await Dokumen.findOne({
    where: { id },
  });
};
