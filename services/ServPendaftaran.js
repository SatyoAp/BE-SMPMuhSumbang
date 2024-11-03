import Pendaftaran from "../model/pendaftaranModel.js";

export const findPendaftaranById = async (id_daftar) => {
  return await Pendaftaran.findOne({
    where: { id_daftar },
  });
};

export const removePendaftaranById = async (id_daftar) => {
  await Pendaftaran.destroy({
    where: { id_daftar },
  });
};

export const updatePendaftaranById = async (
  id_daftar,
  nama,
  tempat_lahir,
  tanggal_lahir,
  nama_ortu,
  alamat,
  no_hp,
  nik,
  asal_sekolah,
  nilai_IPA,
  nilai_Matematika,
  nilai_Bhs_Indonesia,
  nilai_rata_rata
) => {
  return await Pendaftaran.update(
    {
      nama,
      tempat_lahir,
      tanggal_lahir,
      nama_ortu,
      alamat,
      no_hp,
      nik,
      asal_sekolah,
      nilai_IPA,
      nilai_Matematika,
      nilai_Bhs_Indonesia,
      nilai_rata_rata,
    },
    {
      where: { id_daftar },
    }
  );
};
