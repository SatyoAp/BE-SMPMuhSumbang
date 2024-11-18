import Guru from "../model/guruModel.js";

export const findGuruById = async (id) => {
  return await Guru.findOne({
    where: { id },
  });
};

export const removeGuruById = async (id) => {
  try {
    const result = await Guru.destroy({
      where: { id },
    });

    if (result === 0) {
      throw new Error("Tidak ada data yang akan di hapus");
    }

    return { success: true, message: "Data berhasil di hapus" };
  } catch (error) {
    console.error("Error menghapus data guru:", error);
    throw new Error("Gagal menghapus data: " + error.message);
  }
};

export const updateGuruById = async (
  id,
  nama,
  jabatan,
  no_hp,
  email,
  mapel
) => {
  try {
    const result = await Guru.update(
      {
        nama,
        jabatan,
        no_hp,
        email,
        mapel,
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
    console.error("Error update guru:", error);
    throw error;
  }
};

export const createGuru = async (nama, jabatan, no_hp, email, mapel) => {
  // Input validation
  if (!nama || !jabatan || !no_hp || !email || !mapel) {
    throw new Error("Semua kolom harus terisi");
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Format email tidak sesuai");
  }

  try {
    const newGuru = await Guru.create({
      nama,
      jabatan,
      no_hp,
      email,
      mapel,
    });
    return newGuru;
  } catch (error) {
    console.error("Error input guru:", error);
    throw new Error("Gagal input guru: " + error.message);
  }
};
