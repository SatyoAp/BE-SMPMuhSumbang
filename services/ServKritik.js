import Kritik from "../model/kritikModel.js";

export const findKritikById = async (id) => {
  return await Kritik.findOne({
    where: { id },
  });
};

export const removeKritikById = async (id) => {
  try {
    const result = await Kritik.destroy({
      where: { id },
    });

    if (result === 0) {
      throw new Error("Tidak ada data yang akan di hapus");
    }

    return { success: true, message: "Data berhasil di hapus" };
  } catch (error) {
    console.error("Error menghapus kritik:", error);
    throw new Error("Gagal menghapus data: " + error.message);
  }
};

export const updateKritikById = async (id, nama, email, kritik) => {
  try {
    const result = await Kritik.update(
      {
        nama,
        email,
        kritik,
      },
      {
        where: { id },
      }
    );

    if (result[0] === 0) {
      throw new Error("No record found to update");
    }

    return result; // Return the result of the update
  } catch (error) {
    console.error("Error updating kritik:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const createKritik = async (nama, email, kritik) => {
  // Input validation
  if (!nama || !email || !kritik) {
    throw new Error("Semua kolom (nama, email, kritik) harus terisi");
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Format email tidak sesuai");
  }

  try {
    const newKritik = await Kritik.create({
      nama,
      email,
      kritik,
    });
    return newKritik;
  } catch (error) {
    console.error("Error input kritik:", error);
    throw new Error("Gagal input kritik: " + error.message);
  }
};
